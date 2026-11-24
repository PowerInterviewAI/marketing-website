// Renders public/brand/open-graph.png from real app screenshots.
//   node scripts/generate-og.mjs
import { join } from 'node:path';

import { ROOT, dataUri, languageCount, openRenderer } from './lib/render-html.mjs';

const OUTPUT = join(ROOT, 'public/brand/open-graph.png');

// Endonyms, so a reader in any of these scripts finds their own. One per
// script family where possible; the full list is LanguagesSection.
const LANGUAGES = [
  'English',
  'Español',
  'Deutsch',
  'Français',
  'Português',
  '日本語',
  '한국어',
  '中文',
  'العربية',
  'Русский',
];

// Both modes, as equals and in the order a candidate meets them: the mock
// interview's scored report in front, the live assistant behind it. Matches
// hero.title / hero.subtitle; re-run when either changes.
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=block">
<style>
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden;background:#0a0a0c}
body{position:relative;color:#f4f4f6;font-family:Inter,'Segoe UI',sans-serif}
.wash{position:absolute;inset:0;background:radial-gradient(640px 520px at 86% 30%,rgba(250,146,48,.28),transparent 70%),radial-gradient(520px 360px at 4% 105%,rgba(250,146,48,.12),transparent 72%),radial-gradient(420px 300px at 60% 90%,rgba(56,150,230,.07),transparent 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:radial-gradient(ellipse 80% 75% at 40% 0%,#000 25%,transparent 100%)}
.copy{position:absolute;left:60px;top:52px;width:560px;height:526px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-size:24px;font-weight:700;letter-spacing:-.02em}.brand img{width:44px;height:44px;border-radius:11px}
h1{margin-top:40px;font-size:60px;line-height:1.02;font-weight:800;letter-spacing:-.042em;background:linear-gradient(180deg,#fff 40%,rgba(244,244,246,.72));-webkit-background-clip:text;color:transparent}
h1 span{background:linear-gradient(100deg,#ffb15c,#fb8a1f);-webkit-background-clip:text;color:transparent}
p{margin-top:22px;width:520px;font-size:23px;line-height:1.36;font-weight:500;color:#b4b4bd}
.facts{margin-top:auto;margin-bottom:18px;display:flex;gap:10px}
.fact{padding:11px 18px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(255,255,255,.05);font-size:19px;font-weight:600;white-space:nowrap;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
.fact.main{border-color:transparent;background:linear-gradient(180deg,#ffa647,#f98b1e);color:#1b0f05;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 10px 28px -8px rgba(250,146,48,.7)}
.stage{position:absolute;left:640px;top:0;width:640px;height:630px;perspective:1400px}
.win{position:absolute;overflow:hidden;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:#121214;box-shadow:0 40px 90px -20px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.08)}
.win img{display:block;width:100%}
.live{left:70px;top:58px;width:500px;transform:rotateY(-14deg) rotateX(5deg) rotateZ(2deg)}
.mock{left:10px;top:300px;width:500px;transform:rotateY(-12deg) rotateX(4deg) rotateZ(-2deg);box-shadow:0 50px 110px -20px rgba(0,0,0,.9),0 0 0 1px rgba(250,146,48,.25),0 0 60px -10px rgba(250,146,48,.35)}
.chip{position:absolute;display:flex;align-items:center;gap:10px;padding:10px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:rgba(16,16,19,.6);backdrop-filter:blur(14px);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 18px 40px -10px rgba(0,0,0,.7);font-size:18px;font-weight:700;white-space:nowrap}
.chip b{font-size:13px;letter-spacing:.14em;color:#fb9833}
.chip i{width:8px;height:8px;border-radius:50%;background:#fb9833;box-shadow:0 0 10px #fb9833}
.c1{left:-14px;top:268px;transform:rotate(-4deg)}.c2{left:300px;top:30px;transform:rotate(3deg)}
.c2 i{background:#3ecf8e;box-shadow:0 0 10px #3ecf8e}
.languages{position:absolute;left:628px;top:500px;width:566px;display:flex;flex-wrap:wrap;gap:7px}
.languages span{padding:6px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:rgba(16,16,19,.72);backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 10px 24px -6px rgba(0,0,0,.7);font-size:16px;font-weight:600;line-height:1.25}
.languages span:first-child{border-color:rgba(250,146,48,.5);color:#ffb15c}
.sample{position:absolute;left:62px;bottom:14px;font-size:13px;font-weight:600;color:rgba(244,244,246,.45)}
</style></head><body><div class="wash"></div><div class="grid"></div>
<main class="copy"><div class="brand"><img src="${dataUri('public/brand/logo.png', 'image/png')}" alt="">Power Interview AI</div>
<h1>Practice the interview.<br><span>Get backup in the real one.</span></h1>
<p>An AI interviewer that scores every answer, then live talking points beside your call.</p>
<div class="facts"><div class="fact main">1 free hour</div><div class="fact">${languageCount} languages</div><div class="fact">Any role</div></div></main>
<div class="stage">
<div class="win live"><img src="${dataUri('public/media/docs/app/overview.jpg', 'image/jpeg')}" alt=""></div>
<div class="win mock"><img src="${dataUri('public/media/docs/mock/report.png', 'image/png')}" alt=""></div>
<div class="chip c1"><i></i><b>BEFORE</b>Mock interview</div>
<div class="chip c2"><i></i><b>DURING</b>Live help</div>
</div>
<div class="languages">${LANGUAGES.map((name) => `<span>${name}</span>`).join('')}<span>+${languageCount - LANGUAGES.length} more</span></div>
<div class="sample">Real app, sample data</div>
</body></html>`;

const renderer = await openRenderer();
await renderer.render({ html, width: 1200, height: 630, output: OUTPUT, palette: true });
await renderer.close();
process.exit(0);
