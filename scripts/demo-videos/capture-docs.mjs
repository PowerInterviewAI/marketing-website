// Captures the docs screenshots from the real client renderer with sample data.
// Start `pnpm exec vite --port 15173 --strictPort` in ../client-app first, then run:
//   node scripts/demo-videos/capture-docs.mjs public/media/docs [app/overview.jpg ...]
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { account, baseConfig, mock, report } from './scenes.mjs';

const [outDir, ...names] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const URL_BASE = 'http://localhost:15173';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9345;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TIME = 1795000000000;
const question = 'Tell me about a time you turned around an unhappy customer.';
const answer =
  'Our largest client was ready to leave after a late delivery. I called them that day, agreed a recovery plan, and they renewed.';
const live = {
  ...account,
  runningState: 'running',
  hasHistory: true,
  transcripts: [
    { timestamp: TIME, text: 'Thanks for making time today.', speaker: 'other' },
    { timestamp: TIME + 3000, text: 'Thank you, happy to be here.', speaker: 'self' },
    { timestamp: TIME + 7000, text: question, speaker: 'other' },
    { timestamp: TIME + 15000, text: answer, speaker: 'self' },
  ],
  liveSuggestions: [
    {
      timestamp: TIME + 9000,
      last_question: question,
      answer:
        '**Lead with the outcome**\n\n- The client renewed\n- You called the same day\n- You agreed a clear recovery plan',
      state: 'success',
      error: '',
      mode: 'professional',
    },
  ],
};
const answers = report.questions.map((q) => ({
  question: q.question,
  kind: 'behavioral',
  answer: q.answer,
  skipped: false,
}));
const current = {
  text: report.questions[1].question,
  kind: 'situational',
  hasAudio: true,
  isFollowUp: false,
  chunks: [],
};
const profile = {
  fullName: 'Alex Rivera',
  profileData:
    'Alex Rivera\nCustomer Success Manager\n\nSeven years leading enterprise accounts. Managed a team of eight and raised renewals by 18%.',
  context:
    'Senior Customer Success Manager\n\nOwn renewals for enterprise customers, lead recovery plans, and coach a team of account managers.',
};
const button = (test) =>
  `[...document.querySelectorAll('button,[role=button]')].find((b) => b.getClientRects().length && (${test}))`;

const SHOTS = {
  'app/overview.jpg': { route: '/main', state: live },
  'app/language-menu.png': {
    route: '/main',
    state: live,
    click: button(`/^\\s*EN\\s*$/.test(b.textContent)`),
  },
  'app/audio-options.png': {
    route: '/main',
    state: live,
    click: `document.querySelector('button:has(svg.lucide-mic)')`,
  },
  // Export is disabled while a session runs, so this is the console after Stop.
  'app/export-menu.png': {
    route: '/main',
    state: { ...live, runningState: 'idle' },
    click: `document.querySelector('[aria-label*="xport" i]')`,
  },
  'app/account.png': { route: '/account', state: account },
  'app/first-run-setup.png': {
    route: '/onboarding',
    state: { ...account, onboardingCompleted: false },
  },
  'mock/setup.png': {
    route: '/',
    state: account,
    click: button(`/mock interview/i.test(b.textContent)`),
  },
  'mock/session.png': {
    route: '/mock-interview',
    state: {
      ...account,
      mockInterview: mock({
        state: 'listening',
        answers: answers.slice(0, 1),
        currentQuestion: current,
        currentAnswerText: report.questions[1].answer,
      }),
    },
  },
  'mock/report.png': {
    route: '/mock-interview',
    state: {
      ...account,
      hasMockContent: true,
      hasUnsavedMockContent: true,
      mockInterview: mock({ state: 'finished', questionNumber: 5, report, answers }),
    },
  },
};

const stub = (state, config) => `(() => {
  let current = ${JSON.stringify(state)};
  let settings = ${JSON.stringify(config)};
  const special = {
    platform: 'win32',
    appState: { get: async () => current, update: async (u) => (current = { ...current, ...u }) },
    config: { get: async () => settings, update: async (p) => (settings = { ...settings, ...p }) },
    account: { get: async () => ({ success: true, data: ${JSON.stringify(profile)} }) },
    onAppStateUpdated: () => () => {},
    zoom: { getFactor: async () => 1, onChange: () => () => {}, setFactor: async () => {}, increase: async () => {}, decrease: async () => {}, reset: async () => {} },
  };
  const make = () => new Proxy(() => Promise.resolve(undefined), {
    get: (_, key) => key === 'then' || typeof key === 'symbol' ? undefined : String(key).startsWith('on') ? () => () => {} : make(),
    apply: () => Promise.resolve(undefined),
  });
  const api = new Proxy({}, { get: (_, key) => key === 'then' || typeof key === 'symbol' ? undefined : key in special ? special[key] : String(key).startsWith('on') ? () => () => {} : make() });
  Object.defineProperty(window, 'electronAPI', { value: api });
  Object.defineProperty(window, 'electron', { value: api });
  try { localStorage.setItem('theme', 'dark'); } catch {}
  // The browser's test microphone has a label that should not appear in documentation.
  const enumerate = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
  navigator.mediaDevices.enumerateDevices = async () => {
    const first = (await enumerate()).find((d) => d.kind === 'audioinput');
    return first ? [{ kind: 'audioinput', deviceId: first.deviceId, groupId: first.groupId, label: 'Headset Microphone', toJSON() { return this; } }] : [];
  };
})();`;

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
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'docs-capture-'))}`,
    '--no-first-run',
    '--hide-scrollbars',
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
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
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }))?.result
    ?.value;

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 1040,
  height: 680,
  deviceScaleFactor: 1.5,
  mobile: false,
});

let script;
for (const name of names.length ? names : Object.keys(SHOTS)) {
  const shot = SHOTS[name];
  if (script) await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: script });
  ({ identifier: script } = await send('Page.addScriptToEvaluateOnNewDocument', {
    source: stub(shot.state, { ...baseConfig, showTranscriptPanel: true }),
  }));
  await send('Page.navigate', { url: 'about:blank' });
  await sleep(150);
  await send('Page.navigate', { url: `${URL_BASE}/#${shot.route}` });
  await sleep(3200);
  if (shot.route === '/main') {
    await evaluate(`(async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      navigator.mediaDevices.dispatchEvent(new Event('devicechange'));
      const entry = performance.getEntriesByType('resource').map((e) => e.name).find((n) => n.includes('live-transcription.service'));
      if (entry) { const { liveTranscriptionService: s } = await import(entry); s.isConnected = () => true; s.getMicStream = () => stream; }
      return 1;
    })()`);
    await sleep(1300);
  }
  if (name === 'mock/report.png') {
    await evaluate(
      `[...document.querySelectorAll('button')].find((b) => b.textContent.includes('difficult deadline'))?.click(); 1`
    );
    await sleep(500);
  }
  if (shot.click) {
    const rect = await evaluate(
      `(() => { const e = ${shot.click}; if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; })()`
    );
    if (!rect) console.log(name, 'control not found');
    else {
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...rect });
      await send('Input.dispatchMouseEvent', {
        type: 'mousePressed',
        ...rect,
        button: 'left',
        clickCount: 1,
      });
      await send('Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        ...rect,
        button: 'left',
        clickCount: 1,
      });
      await sleep(800);
    }
  }
  const jpg = name.endsWith('.jpg');
  const image = await send(
    'Page.captureScreenshot',
    jpg ? { format: 'jpeg', quality: 88 } : { format: 'png' }
  );
  mkdirSync(dirname(join(outDir, name)), { recursive: true });
  writeFileSync(join(outDir, name), Buffer.from(image.data, 'base64'));
  console.log(name, 'captured');
}
ws.close();
edge.kill();
process.exit(0);
