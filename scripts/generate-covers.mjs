// Renders the social-profile cover images into brand/social/.
//   node scripts/generate-covers.mjs
//
// One layout, laid out inside each platform's safe area - the part that is
// neither under the profile picture/logo nor cropped off on a phone. The
// area outside it carries only background. Sizes and safe areas are the
// platforms' published guidance as of 2026; check them before a re-run.
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { ROOT, dataUri, languageCount, openRenderer } from './lib/render-html.mjs';

const OUT_DIR = join(ROOT, 'brand/social');

/**
 * safe: [x, y, width, height] in output pixels.
 * compact: drop the brand row, language chips and chips on the windows (very short banners).
 * subtitle: room for the one-line pitch under the headline (card-shaped images only).
 */
const COVERS = [
  // Header 1500x500. The avatar covers the bottom-left; phones crop ~60px top and bottom.
  { name: 'x-header', width: 1500, height: 500, safe: [430, 60, 1030, 380] },
  // Personal profile background 1584x396. The photo covers the left third, lower half.
  { name: 'linkedin-profile', width: 1584, height: 396, safe: [480, 34, 1064, 328] },
  // Company page cover 1128x191. The logo sits over the bottom-left.
  { name: 'linkedin-company', width: 1128, height: 191, safe: [220, 16, 880, 159], compact: true },
  // Page cover 1640x624. Phones show the middle ~1110px.
  { name: 'facebook-cover', width: 1640, height: 624, safe: [300, 70, 1060, 460] },
  // Channel banner 2560x1440. Only the centre 1546x423 shows on every device.
  { name: 'youtube-banner', width: 2560, height: 1440, safe: [507, 508, 1546, 423] },
  // Repository social preview 1280x640.
  {
    name: 'github-social-preview',
    width: 1280,
    height: 640,
    safe: [60, 56, 1160, 528],
    subtitle: true,
  },
  // Product Hunt gallery image 1270x760.
  {
    name: 'producthunt-gallery',
    width: 1270,
    height: 760,
    safe: [64, 72, 1142, 616],
    subtitle: true,
  },
];

// One row on every banner, so short enough to fit the narrowest copy column.
const LANGUAGES = ['English', 'Español', 'Deutsch', '日本語', '中文', 'العربية'];

const LOGO = dataUri('public/brand/logo.png', 'image/png');
const MOCK = dataUri('public/media/docs/mock/report.png', 'image/png');
const LIVE = dataUri('public/media/docs/app/overview.jpg', 'image/jpeg');

const page = ({ width, height, safe: [sx, sy, sw, sh], compact = false, subtitle = false }) => {
  // 1u = 1% of the safe area's height; everything inside it scales from that.
  const u = sh / 100;
  const glowX = ((sx + sw * 0.78) / width) * 100;
  const glowY = ((sy + sh * 0.35) / height) * 100;

  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=block">
<style>
*{box-sizing:border-box;margin:0}
html,body{width:${width}px;height:${height}px;overflow:hidden;background:#0a0a0c}
body{position:relative;color:#f4f4f6;font-family:Inter,'Segoe UI',sans-serif;--u:${u}px}
.wash{position:absolute;inset:0;background:
  radial-gradient(${sw * 0.55}px ${sh * 1.1}px at ${glowX}% ${glowY}%,rgba(250,146,48,.26),transparent 70%),
  radial-gradient(${sw * 0.4}px ${sh * 0.8}px at ${((sx + sw * 0.1) / width) * 100}% 100%,rgba(250,146,48,.10),transparent 72%),
  radial-gradient(${sw * 0.3}px ${sh * 0.6}px at ${((sx + sw * 0.55) / width) * 100}% ${((sy + sh) / height) * 100}%,rgba(56,150,230,.07),transparent 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px);background-size:${Math.round(Math.max(28, sh / 9))}px ${Math.round(Math.max(28, sh / 9))}px;
  -webkit-mask-image:radial-gradient(ellipse ${sw * 0.7}px ${sh * 0.9}px at ${((sx + sw * 0.4) / width) * 100}% ${(sy / height) * 100}%,#000 20%,transparent 100%)}
.safe{position:absolute;left:${sx}px;top:${sy}px;width:${sw}px;height:${sh}px;display:flex;gap:calc(var(--u)*6)}
.copy{flex:0 0 ${compact ? 50 : 52}%;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*${compact ? 7 : 4.5});container-type:inline-size}
.brand{display:flex;align-items:center;gap:calc(var(--u)*2.6);font-size:calc(var(--u)*6.4);font-weight:700;letter-spacing:-.02em}
.brand img{width:calc(var(--u)*11);height:calc(var(--u)*11);border-radius:calc(var(--u)*2.8)}
h1{font-size:min(calc(var(--u)*${compact ? 21 : 14}),8.4cqi);line-height:1.03;font-weight:800;letter-spacing:-.042em;
  background:linear-gradient(180deg,#fff 40%,rgba(244,244,246,.74));-webkit-background-clip:text;color:transparent}
h1 span{background:linear-gradient(100deg,#ffb15c,#fb8a1f);-webkit-background-clip:text;color:transparent}
p{font-size:min(calc(var(--u)*5.4),3.4cqi);line-height:1.36;font-weight:500;color:#b4b4bd;max-width:92%}
.row{display:flex;flex-wrap:nowrap;gap:calc(var(--u)*${compact ? 3.2 : 2})}
.fact{padding:calc(var(--u)*${compact ? 3.4 : 2.4}) calc(var(--u)*${compact ? 7 : 4.4});border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(255,255,255,.05);
  font-size:min(calc(var(--u)*${compact ? 8.4 : 4.8}),3.2cqi);font-weight:600;white-space:nowrap;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
.fact.main{border-color:transparent;background:linear-gradient(180deg,#ffa647,#f98b1e);color:#1b0f05;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 calc(var(--u)*2.4) calc(var(--u)*7) calc(var(--u)*-2) rgba(250,146,48,.7)}
/* Sized off the column width too, so all seven fit one row in the narrowest column. */
.lang{flex-shrink:0;white-space:nowrap;padding:.36em .78em;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(16,16,19,.7);
  font-size:min(calc(var(--u)*4.1),2.15cqi);font-weight:600;line-height:1.25;box-shadow:inset 0 1px 0 rgba(255,255,255,.07)}
.lang:first-child{border-color:rgba(250,146,48,.5);color:#ffb15c}
.stage{position:relative;flex:1;perspective:${Math.round(sh * 4)}px}
.frame{position:absolute;aspect-ratio:1560/1020}
.win{width:100%;height:100%;overflow:hidden;border-radius:calc(var(--u)*3);border:1px solid rgba(255,255,255,.16);background:#121214;
  box-shadow:0 calc(var(--u)*10) calc(var(--u)*24) calc(var(--u)*-5) rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.08)}
.win img{display:block;width:100%}
.live{height:calc(var(--u)*${compact ? 70 : 56});top:${compact ? 0 : 'calc(var(--u)*8)'};right:0;transform:rotateY(-14deg) rotateX(5deg) rotateZ(2deg)}
.mock{height:calc(var(--u)*${compact ? 78 : 64});bottom:${compact ? 0 : 'calc(var(--u)*7)'};left:${compact ? 4 : 2}%;transform:rotateY(-12deg) rotateX(4deg) rotateZ(-2deg)}
.mock .win{box-shadow:0 calc(var(--u)*12) calc(var(--u)*28) calc(var(--u)*-5) rgba(0,0,0,.9),0 0 0 1px rgba(250,146,48,.28),0 0 calc(var(--u)*16) calc(var(--u)*-3) rgba(250,146,48,.35)}
.chip{position:absolute;display:flex;align-items:center;gap:calc(var(--u)*2.2);padding:calc(var(--u)*2.2) calc(var(--u)*3.8);border-radius:999px;border:1px solid rgba(255,255,255,.16);
  background:rgba(16,16,19,.66);backdrop-filter:blur(14px);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 calc(var(--u)*4) calc(var(--u)*9) calc(var(--u)*-2) rgba(0,0,0,.7);
  font-size:calc(var(--u)*${compact ? 7.4 : 4.4});font-weight:700;white-space:nowrap;z-index:2}
.chip b{font-size:.72em;letter-spacing:.14em;color:#fb9833}
.chip i{width:calc(var(--u)*1.8);height:calc(var(--u)*1.8);border-radius:50%;background:#fb9833;box-shadow:0 0 calc(var(--u)*2.4) #fb9833}
.mock .chip{left:calc(var(--u)*-3);top:calc(var(--u)*-6);transform:rotate(-4deg)}
.live .chip{right:calc(var(--u)*2);top:calc(var(--u)*-5);transform:rotate(3deg)}
.live .chip i{background:#3ecf8e;box-shadow:0 0 calc(var(--u)*2.4) #3ecf8e}
.sample{position:absolute;right:0;bottom:0;font-size:max(11px,calc(var(--u)*2.8));font-weight:600;color:rgba(244,244,246,.45);white-space:nowrap}
</style></head><body><div class="wash"></div><div class="grid"></div>
<div class="safe">
  <main class="copy">
    ${compact ? '' : `<div class="brand"><img src="${LOGO}" alt="">Power Interview AI</div>`}
    <h1>Practice the interview.<br><span>Get backup in the real one.</span></h1>
    ${!subtitle ? '' : '<p>An AI interviewer that scores every answer, then live talking points beside your call.</p>'}
    <div class="row"><div class="fact main">1 free hour</div><div class="fact">${languageCount} languages</div><div class="fact">Any role</div></div>
    ${compact ? '' : `<div class="row">${LANGUAGES.map((name) => `<span class="lang">${name}</span>`).join('')}<span class="lang">+${languageCount - LANGUAGES.length} more</span></div>`}
  </main>
  <div class="stage">
    <div class="frame live"><div class="win"><img src="${LIVE}" alt=""></div>${compact ? '' : '<div class="chip"><i></i><b>DURING</b>Live help</div>'}</div>
    <div class="frame mock"><div class="win"><img src="${MOCK}" alt=""></div>${compact ? '' : '<div class="chip"><i></i><b>BEFORE</b>Mock interview</div>'}</div>
    ${compact ? '' : '<div class="sample">Real app, sample data</div>'}
  </div>
</div>
</body></html>`;
};

mkdirSync(OUT_DIR, { recursive: true });
const only = process.argv.slice(2);
const renderer = await openRenderer();
for (const cover of COVERS) {
  if (only.length && !only.includes(cover.name)) continue;
  await renderer.render({
    html: page(cover),
    width: cover.width,
    height: cover.height,
    output: join(OUT_DIR, `${cover.name}.png`),
  });
}
await renderer.close();
process.exit(0);
