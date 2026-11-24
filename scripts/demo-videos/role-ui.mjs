// Records the part of the real mock interview UI used in the role videos.
// Start `pnpm exec vite --port 15173 --strictPort` in ../client-app first, then run:
//   node scripts/demo-videos/role-ui.mjs <output-dir> [role...]
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { account, baseConfig, mock } from './scenes.mjs';

export const FPS = 16;
export const SECONDS = 12;

export const ROLES = {
  developer: {
    name: 'Daniel Chen',
    score: 86,
    question: 'Walk me through how you would design a rate limiter for a public API.',
    answer:
      'I would use a token bucket in Redis, keyed per API client. Each request takes one token atomically, and calls over the limit get a 429 with Retry-After.',
    strength: 'Clear design with a concrete failure response',
    gap: 'Mention how limits behave across regions',
  },
  sales: {
    name: 'Arjun Mehta',
    score: 82,
    question: 'How would you recover a deal that has gone quiet before quarter end?',
    answer:
      'I would call my champion today, find out what changed, and agree a dated plan with the buyer. If budget is the blocker, I would offer a phased start.',
    strength: 'Practical next step with a clear owner',
    gap: 'Quantify the deal and the risk',
  },
  nurse: {
    name: 'Maya Cole',
    score: 88,
    question: 'Describe how you prioritize care when two patients need you at once.',
    answer:
      'I assess who is at greatest risk first. I attend the unstable patient, ask a colleague to check the other, and update both patients and the charge nurse.',
    strength: 'Safe prioritization and clear escalation',
    gap: 'Name the assessment you would use',
  },
  teacher: {
    name: 'Elena Ortiz',
    score: 84,
    question: 'How do you support a student who has fallen behind the class?',
    answer:
      'I find the exact gap with a short check, then plan small-group practice twice a week. I share progress with the student and family so we adjust together.',
    strength: 'Targeted support with family involvement',
    gap: 'Add a result from a past student',
  },
  finance: {
    name: 'Leila Haddad',
    score: 79,
    question: 'Tell me about a forecast that was wrong and what you changed.',
    answer:
      'Our revenue forecast missed by eight percent because renewals slipped. I added a weighted pipeline view and monthly variance reviews to catch it earlier.',
    strength: 'Owns the miss and explains the fix',
    gap: 'Show how accuracy improved afterward',
  },
};

const URL_BASE = 'http://localhost:15173';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9349;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const scoresFor = (score) =>
  [score - 8, score + 3, score - 2, score + 4, score + 1].map((v) => Math.min(v, 98));

const accountFor = (role) => ({
  ...account,
  interviewConfig: { fullName: role.name, hasProfileData: true },
});
const current = (role) => ({
  text: role.question,
  kind: 'situational',
  hasAudio: true,
  isFollowUp: false,
  chunks: [role.question],
});
const sessionState = (role, t) => {
  const progress = Math.max(0, Math.min(1, (t - 0.6) / 7));
  const text = role.answer.slice(0, Math.floor(role.answer.length * progress));
  if (t < 8.2)
    return {
      ...accountFor(role),
      mockInterview: mock({
        state: 'listening',
        questionNumber: 3,
        currentQuestion: current(role),
        currentAnswerText: text,
      }),
    };
  return {
    ...accountFor(role),
    mockInterview: mock({
      state: 'evaluating',
      questionNumber: 3,
      currentQuestion: current(role),
      answers: [
        { question: role.question, kind: 'situational', answer: role.answer, skipped: false },
      ],
    }),
  };
};
const reportState = (role) => {
  const questions = scoresFor(role.score).map((score, i) => ({
    question: `${role.question} ${i}`,
    answer: role.answer,
    score,
    justification: role.strength,
    stronger_answer: role.answer,
  }));
  return {
    ...accountFor(role),
    hasMockContent: true,
    mockInterview: mock({
      state: 'finished',
      questionNumber: 5,
      answers: questions.map((q) => ({
        question: q.question,
        kind: 'situational',
        answer: q.answer,
        skipped: false,
      })),
      report: {
        overall_score: role.score,
        strengths: [role.strength],
        gaps: [role.gap],
        questions,
      },
    }),
  };
};
const stub = (state) => `(() => {
  let state = ${JSON.stringify(state)};
  let config = ${JSON.stringify({ ...baseConfig })};
  const subscribers = new Set();
  const special = {
    platform: 'win32',
    appState: { get: async () => state, update: async (u) => (state = { ...state, ...u }) },
    config: { get: async () => config, update: async (p) => (config = { ...config, ...p }) },
    onAppStateUpdated: (fn) => { subscribers.add(fn); return () => subscribers.delete(fn); },
    zoom: { getFactor: async () => 1, onChange: () => () => {}, setFactor: async () => {}, increase: async () => {}, decrease: async () => {}, reset: async () => {} },
  };
  const make = () => new Proxy(() => Promise.resolve(undefined), { get: (_, key) => key === 'then' || typeof key === 'symbol' ? undefined : String(key).startsWith('on') ? () => () => {} : make(), apply: () => Promise.resolve(undefined) });
  const api = new Proxy({}, { get: (_, key) => key === 'then' || typeof key === 'symbol' ? undefined : key in special ? special[key] : String(key).startsWith('on') ? () => () => {} : make() });
  Object.defineProperty(window, 'electronAPI', { value: api });
  Object.defineProperty(window, 'electron', { value: api });
  try { localStorage.setItem('theme', 'dark'); } catch {}
  window.__demo = { set(next) { state = next; subscribers.forEach((fn) => fn(state)); } };
})();`;

const main = async () => {
  const [outDir, ...names] = process.argv.slice(2);
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
      `--user-data-dir=${mkdtempSync(join(tmpdir(), 'role-ui-'))}`,
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
  const evaluate = async (expression) =>
    (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }))
      ?.result?.value;
  const capture = async (clip) =>
    Buffer.from(
      (await send('Page.captureScreenshot', { format: 'png', clip: { ...clip, scale: 1 } })).data,
      'base64'
    );
  await send('Page.enable');
  await send('Runtime.enable');

  let script;
  const open = async (state, width, height) => {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: false,
    });
    if (script) await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: script });
    ({ identifier: script } = await send('Page.addScriptToEvaluateOnNewDocument', {
      source: stub(state),
    }));
    await send('Page.navigate', { url: 'about:blank' });
    await sleep(120);
    await send('Page.navigate', { url: `${URL_BASE}/#/mock-interview` });
    await sleep(2600);
  };

  for (const key of names.length ? names : Object.keys(ROLES)) {
    const role = ROLES[key];
    const dir = join(outDir, key);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });

    await open(reportState(role), 640, 520);
    const card = await evaluate(
      `(() => { const ring = document.querySelector('svg.-rotate-90'); const b = ring.closest('[data-slot=card]').getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height }; })()`
    );
    writeFileSync(join(dir, 'score.png'), await capture(card));

    // The phone variant uses a narrower window so its text stays readable in a small video.
    for (const [variant, width, height] of [
      ['desktop', 640, 300],
      ['mobile', 430, 350],
    ]) {
      const frames = join(dir, variant);
      mkdirSync(frames, { recursive: true });
      await open(sessionState(role, 7.8), width, height);
      const clip = await evaluate(`(() => {
        const label = [...document.querySelectorAll('main *')].filter((e) => e.children.length === 0 && e.textContent.trim() === ${JSON.stringify(role.name)}).pop();
        const top = Math.max(0, Math.floor(label.getBoundingClientRect().top - 10));
        return { x: 0, y: top, width: innerWidth, height: innerHeight - top };
      })()`);
      await send('Emulation.setVirtualTimePolicy', { policy: 'pause' });
      for (let frame = 0; frame < FPS * SECONDS; frame++) {
        await evaluate(`window.__demo.set(${JSON.stringify(sessionState(role, frame / FPS))}); 1`);
        await send('Emulation.setVirtualTimePolicy', { policy: 'advance', budget: 1000 / FPS });
        await sleep(14);
        writeFileSync(join(frames, `${String(frame).padStart(4, '0')}.png`), await capture(clip));
      }
      await send('Emulation.setVirtualTimePolicy', { policy: 'advance' });
      console.log(key, variant, JSON.stringify({ panel: [clip.width, clip.height] }));
    }
  }
  ws.close();
  edge.kill();
  process.exit(0);
};

if (process.argv[1]?.replace(/\\/g, '/').endsWith('role-ui.mjs')) await main();
