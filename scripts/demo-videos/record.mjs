import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { SCENES, baseConfig } from './scenes.mjs';

const [outRoot, mode, ...names] = process.argv.slice(2);
const OUT = join(outRoot, 'demo-output');
mkdirSync(OUT, { recursive: true });
const URL_BASE = 'http://localhost:15173';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9340;
const FPS = 24;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 120; i++) {
  try {
    if ((await fetch(URL_BASE)).ok) break;
  } catch {}
  await sleep(500);
}

const edge = spawn(
  EDGE,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'demo-record-'))}`,
    '--no-first-run',
    '--hide-scrollbars',
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
    '--disable-gpu-vsync',
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
const waiters = new Map();
const errors = [];
ws.onmessage = (event) => {
  const m = JSON.parse(event.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
  if (m.method && waiters.has(m.method)) {
    waiters.get(m.method)(m.params);
    waiters.delete(m.method);
  }
  if (m.method === 'Runtime.exceptionThrown')
    errors.push(
      m.params.exceptionDetails.exception?.description?.slice(0, 260) ??
        m.params.exceptionDetails.text
    );
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error')
    errors.push(String(m.params.args[0]?.value ?? m.params.args[0]?.description).slice(0, 260));
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const i = ++id;
    pending.set(i, (m) =>
      m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)
    );
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const once = (method) => new Promise((resolve) => waiters.set(method, resolve));
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }))?.result
    ?.value;

const stub = (state, config) => `(() => {
  let state = ${JSON.stringify(state)};
  let config = ${JSON.stringify(config)};
  const subscribers = new Set();
  const special = {
    platform: 'win32',
    appState: { get: async () => state, update: async (u) => (state = { ...state, ...u }) },
    config: { get: async () => config, update: async (p) => (config = { ...config, ...p }) },
    onAppStateUpdated: (fn) => { subscribers.add(fn); return () => subscribers.delete(fn); },
    zoom: { getFactor: async () => 1, onChange: () => () => {}, setFactor: async () => {}, increase: async () => {}, decrease: async () => {}, reset: async () => {} },
  };
  const make = (base = () => Promise.resolve(undefined)) => new Proxy(base, {
    get(target, key) {
      if (key === 'then' || typeof key === 'symbol') return undefined;
      if (String(key).startsWith('on')) return () => () => {};
      return make();
    },
    apply: () => Promise.resolve(undefined),
  });
  const api = new Proxy({}, { get: (_, key) => key === 'then' || typeof key === 'symbol' ? undefined : key in special ? special[key] : String(key).startsWith('on') ? () => () => {} : make() });
  Object.defineProperty(window, 'electronAPI', { value: api });
  Object.defineProperty(window, 'electron', { value: api });
  try { localStorage.setItem('theme', 'dark'); } catch {}
  window.__demo = { set(next) { state = next; subscribers.forEach((fn) => fn(state)); } };
})();`;

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 1024,
  height: 576,
  deviceScaleFactor: 1.875,
  mobile: false,
});

let script;
for (const name of names.length ? names : Object.keys(SCENES)) {
  const scene = SCENES[name];
  const config = { ...baseConfig, ...scene.config };
  if (script) await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: script });
  ({ identifier: script } = await send('Page.addScriptToEvaluateOnNewDocument', {
    source: stub(scene.at(0), config),
  }));
  await send('Page.navigate', { url: 'about:blank' });
  await sleep(200);
  await send('Page.navigate', { url: `${URL_BASE}/#${scene.route}` });
  await sleep(4500);
  await evaluate(
    `localStorage.setItem('theme','dark'); document.documentElement.classList.add('dark'); 1`
  );
  // The session's status comes from services that are normally connected to the backend.
  if (scene.route === '/main')
    console.log(
      name,
      'status patch:',
      await evaluate(`(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    navigator.mediaDevices.dispatchEvent(new Event('devicechange'));
    const entry = performance.getEntriesByType('resource').map((e) => e.name).find((n) => n.includes('live-transcription.service'));
    if (!entry) return 'service not loaded';
    const { liveTranscriptionService: service } = await import(entry);
    service.isConnected = () => true;
    service.getMicStream = () => stream;
    return 'ok';
  })()`)
    );
  await sleep(1200);

  if (mode === 'preview') {
    const start = Date.now();
    const done = new Set();
    while ((Date.now() - start) / 1000 < scene.preview) {
      const t = (Date.now() - start) / 1000;
      await evaluate(`window.__demo.set(${JSON.stringify(scene.at(t))}); 1`);
      for (const action of scene.actions ?? [])
        if (t >= action.t && !done.has(action)) {
          done.add(action);
          await evaluate(action.js);
        }
      await sleep(80);
    }
    await sleep(350);
    writeFileSync(
      join(OUT, `preview-${name}.png`),
      Buffer.from((await send('Page.captureScreenshot', { format: 'png' })).data, 'base64')
    );
    console.log(
      name,
      'route',
      await evaluate('location.hash'),
      '|',
      await evaluate('document.body.innerText.replace(/\\s+/g, " ").slice(0, 150)')
    );
    continue;
  }

  const dir = join(OUT, name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  await send('Emulation.setVirtualTimePolicy', { policy: 'pause' });
  const total = Math.round(scene.duration * FPS);
  const done = new Set();
  const started = Date.now();
  for (let frame = 0; frame < total; frame++) {
    const t = frame / FPS;
    await evaluate(`window.__demo.set(${JSON.stringify(scene.at(t))}); 1`);
    for (const action of scene.actions ?? [])
      if (t >= action.t && !done.has(action)) {
        done.add(action);
        await evaluate(action.js);
      }
    const budget = once('Emulation.virtualTimeBudgetExpired');
    await send('Emulation.setVirtualTimePolicy', { policy: 'advance', budget: 1000 / FPS });
    await Promise.race([budget, sleep(1500)]);
    waiters.delete('Emulation.virtualTimeBudgetExpired');
    let shot;
    for (let attempt = 0; !shot; attempt++) {
      try {
        shot = await Promise.race([
          send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true }),
          sleep(4000).then(() => {
            throw new Error('capture timed out');
          }),
        ]);
      } catch (error) {
        if (attempt >= 6) throw error;
        // A route swap can leave no compositor frame while virtual time is paused.
        await send('Emulation.setVirtualTimePolicy', { policy: 'advance' });
        await sleep(250);
        await send('Emulation.setVirtualTimePolicy', { policy: 'pause' });
      }
    }
    writeFileSync(
      join(dir, `${String(frame).padStart(5, '0')}.png`),
      Buffer.from(shot.data, 'base64')
    );
    if (frame % 96 === 0)
      console.log(name, `frame ${frame}/${total}`, `${Math.round((Date.now() - started) / 1000)}s`);
  }
  await send('Emulation.setVirtualTimePolicy', { policy: 'advance' });
  execFileSync('ffmpeg', [
    '-y',
    '-v',
    'error',
    '-framerate',
    String(FPS),
    '-i',
    join(dir, '%05d.png'),
    '-vf',
    'scale=1920:-2:flags=lanczos,format=yuv420p',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '20',
    '-tune',
    'animation',
    '-movflags',
    '+faststart',
    '-an',
    join(OUT, `${name}.mp4`),
  ]);
  console.log(name, 'encoded');
}
console.log('errors:', [...new Set(errors)].filter((e) => !/favicon|ERR_/.test(e)).slice(0, 10));
ws.close();
edge.kill();
process.exit(0);
