// Renders an HTML string to a PNG with headless Edge over the DevTools
// protocol. Shared by generate-og.mjs and generate-covers.mjs.
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9347;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const dataUri = (path, type) =>
  `data:${type};base64,${readFileSync(join(ROOT, path)).toString('base64')}`;

/** Every language an interview can run in, counted from the config. */
export const languageCount =
  readFileSync(join(ROOT, 'src/config/languages.ts'), 'utf8').match(/nativeName: /g).length - 1;

/**
 * Starts one browser for a batch of renders.
 * @returns {Promise<{ render: (job: { html: string, width: number, height: number,
 *   output: string, palette?: boolean }) => Promise<void>, close: () => Promise<void> }>}
 */
export async function openRenderer() {
  const work = mkdtempSync(join(tmpdir(), 'render-html-'));
  const edge = spawn(
    EDGE,
    [
      '--headless=new',
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${join(work, 'profile')}`,
      '--no-first-run',
      '--hide-scrollbars',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );
  let target;
  for (let i = 0; i < 40 && !target; i++) {
    try {
      target = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find(
        (t) => t.type === 'page'
      );
    } catch {}
    if (!target) await sleep(250);
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const m = JSON.parse(event.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m);
      pending.delete(m.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const i = ++id;
      pending.set(i, (m) => resolve(m.result));
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  await send('Page.enable');
  await send('Runtime.enable');

  let n = 0;
  const render = async ({ html, width, height, output, palette = false }) => {
    const page = join(work, `page-${++n}.html`);
    const raw = join(work, `page-${n}.png`);
    writeFileSync(page, html);
    // Rendered at 2x and downscaled with lanczos: crisper text than 1x.
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: false,
    });
    await send('Page.navigate', { url: `file:///${page.replaceAll('\\', '/')}` });
    await sleep(1500);
    const fonts = await send('Runtime.evaluate', {
      expression: `document.fonts.ready.then(() => document.fonts.check('800 40px Inter'))`,
      awaitPromise: true,
      returnByValue: true,
    });
    if (!fonts.result.value) console.warn(`Inter did not load for ${output}`);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(raw, Buffer.from(shot.data, 'base64'));
    // The palette pass keeps the OG card small; covers keep full colour,
    // since the platforms recompress them anyway and a 256-colour gradient bands.
    const filter = palette
      ? `scale=${width}:${height}:flags=lanczos,split[a][b];[a]palettegen=max_colors=256:stats_mode=full[p];[b][p]paletteuse=dither=sierra2_4a`
      : `scale=${width}:${height}:flags=lanczos`;
    execFileSync('ffmpeg', [
      '-y',
      '-v',
      'error',
      '-i',
      raw,
      '-vf',
      filter,
      '-frames:v',
      '1',
      output,
    ]);
    console.log(`${output.replace(ROOT, '').replaceAll('\\', '/')}  ${width}x${height}`);
  };

  const close = async () => {
    ws.close();
    edge.kill();
    await sleep(500);
    try {
      rmSync(work, { recursive: true, force: true });
    } catch {}
  };

  return { render, close };
}
