// Renders public/brand/open-graph.png from the real report screenshot.
//   node scripts/generate-og.mjs
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9347;
const OUTPUT = join(ROOT, 'public/brand/open-graph.png');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dataUri = (path, type) =>
  `data:${type};base64,${readFileSync(join(ROOT, path)).toString('base64')}`;
const languageCount =
  readFileSync(join(ROOT, 'src/config/languages.ts'), 'utf8').match(/nativeName: /g).length - 1;
const LANGUAGES = [
  'English',
  'Español',
  '日本語',
  'العربية',
  'हिन्दी',
  '한국어',
  'Deutsch',
  'Français',
];

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=block">
<style>
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden;background:#0a0a0b}
body{position:relative;color:#f4f4f6;font-family:Inter,'Segoe UI',sans-serif}
.wash{position:absolute;inset:0;background:radial-gradient(620px 520px at 88% 42%,rgba(250,146,48,.30),transparent 70%),radial-gradient(420px 320px at 8% 100%,rgba(250,146,48,.10),transparent 72%)}
.copy{position:absolute;left:60px;top:54px;width:590px;height:522px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-size:25px;font-weight:700;letter-spacing:-.02em}.brand img{width:46px;height:46px;border-radius:11px}
h1{margin-top:48px;font-size:66px;line-height:1.04;font-weight:800;letter-spacing:-.04em}h1 span{color:#fb9833}
p{margin-top:24px;width:530px;font-size:26px;line-height:1.32;font-weight:500;color:#b8b8c0}
.facts{margin-top:auto;display:flex;gap:10px}.fact{padding:11px 17px;border:1px solid #3a3a40;border-radius:10px;background:#17171a;font-size:20px;font-weight:600;white-space:nowrap}.fact.main{border-color:#fb9833;background:#fb9833;color:#1b0f05}
.window{position:absolute;left:690px;top:64px;width:680px;height:454px;overflow:hidden;border:1px solid #47474e;border-radius:16px;background:#121214;box-shadow:0 34px 90px rgba(0,0,0,.72),0 0 0 7px rgba(255,255,255,.035)}
.window img{display:block;width:100%;margin:-40px 0 0 -82px}
.languages{position:absolute;left:668px;top:492px;width:510px;display:flex;flex-wrap:wrap;gap:8px}.languages span{padding:7px 13px;border:1px solid #4a4a50;border-radius:9px;background:#1b1b1f;box-shadow:0 8px 22px rgba(0,0,0,.5);font-size:19px;font-weight:600;line-height:1.25}
</style></head><body><div class="wash"></div>
<main class="copy"><div class="brand"><img src="${dataUri('public/brand/logo.png', 'image/png')}" alt="">Power Interview AI</div>
<h1>Make your mistakes here, <span>not in the interview.</span></h1>
<p>Practice out loud in ${languageCount} languages and get every answer scored.</p>
<div class="facts"><div class="fact main">1 free hour</div><div class="fact">Any role</div><div class="fact">Coding rounds</div></div></main>
<div class="window"><img src="${dataUri('public/media/docs/mock/report.png', 'image/png')}" alt=""></div>
<div class="languages">${LANGUAGES.map((name) => `<span>${name}</span>`).join('')}</div>
</body></html>`;

const work = mkdtempSync(join(tmpdir(), 'og-image-'));
const page = join(work, 'og.html');
const raw = join(work, 'og.png');
writeFileSync(page, html);
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
await send('Emulation.setDeviceMetricsOverride', {
  width: 1200,
  height: 630,
  deviceScaleFactor: 2,
  mobile: false,
});
await send('Page.navigate', { url: `file:///${page.replace(/\\/g, '/')}` });
await sleep(1500);
const fonts = await send('Runtime.evaluate', {
  expression: `document.fonts.ready.then(() => document.fonts.check('800 66px Inter'))`,
  awaitPromise: true,
  returnByValue: true,
});
console.log('Inter loaded:', fonts.result.value, '| languages:', languageCount);
const shot = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync(raw, Buffer.from(shot.data, 'base64'));
ws.close();
edge.kill();
await sleep(500);
execFileSync('ffmpeg', [
  '-y',
  '-v',
  'error',
  '-i',
  raw,
  '-vf',
  'scale=1200:630:flags=lanczos,split[a][b];[a]palettegen=max_colors=256:stats_mode=full[p];[b][p]paletteuse=dither=sierra2_4a',
  '-frames:v',
  '1',
  OUTPUT,
]);
try {
  rmSync(work, { recursive: true, force: true });
} catch {}
process.exit(0);
