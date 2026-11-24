// Combines each generated role clip with its recorded real-UI panel.
//   node scripts/demo-videos/compose-roles.mjs <role-ui-dir> <role-video-dir> public/media/roles [role...]
// <role-video-dir> holds role-<source>.mp4 files from the local Wan 2.2 workflow.
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [uiDir, videoDir, outDir, ...names] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });

// `side` keeps the panel off the person. `focus` is their position across the frame.
const ROLES = {
  developer: { source: 'engineer', side: 'right', focus: 0.3 },
  sales: { source: 'sales', side: 'right', focus: 0.34 },
  nurse: { source: 'nurse', side: 'right', focus: 0.44 },
  teacher: { source: 'teacher', side: 'right', focus: 0.42 },
  finance: { source: 'finance', side: 'left', focus: 0.78 },
};
const FPS = 16;
const SCORE_AT = 8.7;
const ffmpeg = (...args) =>
  execFileSync('ffmpeg', ['-y', '-v', 'error', ...args], { stdio: ['ignore', 'pipe', 'inherit'] });
const size = (file) =>
  execFileSync('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=width,height',
    '-of',
    'csv=p=0',
    file,
  ])
    .toString()
    .trim()
    .split(',')
    .map(Number);
const rounded = (r) =>
  `format=gray,geq=lum='255*lte(hypot(max(abs(X-W/2)-(W/2-${r}),0),max(abs(Y-H/2)-(H/2-${r}),0)),${r})'`;
// Two passes of the forward-and-back clip make a seamless 12-second loop.
const person = (scene) =>
  `[0:v]split[f][r];[r]reverse,trim=start_frame=1:end_frame=48,setpts=PTS-STARTPTS[b];[f][b]concat=n=2:v=1,fps=${FPS},loop=loop=1:size=96:start=0,setpts=N/${FPS}/TB,${scene},format=rgba[base]`;
const panels = (panelW, panelH, scoreW, scoreH) => [
  `color=white:s=${panelW}x${panelH}:d=1,${rounded(14)}[panelmask0]`,
  `[panelmask0]loop=loop=-1:size=1,fps=${FPS}[panelmask]`,
  `[1:v]fps=${FPS},scale=${panelW}:${panelH}:flags=lanczos,format=rgba[ui0]`,
  // The answer panel gives way to the score, so "Thinking" is never shown beside a result.
  `[ui0][panelmask]alphamerge,fade=t=out:st=${SCORE_AT}:d=0.3:alpha=1[ui]`,
  `color=white:s=${scoreW}x${scoreH}:d=1,${rounded(14)}[scoremask0]`,
  `[scoremask0]loop=loop=-1:size=1,fps=${FPS}[scoremask]`,
  `[2:v]fps=${FPS},scale=${scoreW}:${scoreH}:flags=lanczos,format=rgba[score0]`,
  `[score0][scoremask]alphamerge,fade=t=in:st=${SCORE_AT}:d=0.45:alpha=1[score]`,
];
const encode = (file) => [
  '-t',
  '12',
  '-an',
  '-r',
  String(FPS),
  '-pix_fmt',
  'yuv420p',
  '-c:v',
  'libx264',
  '-preset',
  'slow',
  '-crf',
  '23',
  '-profile:v',
  'high',
  '-movflags',
  '+faststart',
  file,
];

for (const key of names.length ? names : Object.keys(ROLES)) {
  const role = ROLES[key];
  const source = join(videoDir, `role-${role.source}.mp4`);
  const score = join(uiDir, key, 'score.png');
  const [cardW, cardH] = size(score);
  const inputs = (variant) => [
    '-i',
    source,
    '-framerate',
    String(FPS),
    '-i',
    join(uiDir, key, variant, '%04d.png'),
    '-loop',
    '1',
    '-framerate',
    String(FPS),
    '-t',
    '12',
    '-i',
    score,
  ];

  {
    const [w, h] = size(join(uiDir, key, 'desktop', '0000.png'));
    const panelW = 820;
    const panelH = Math.round((h * panelW) / w / 2) * 2;
    const scoreH = Math.round((cardH * panelW) / cardW / 2) * 2;
    const x = role.side === 'right' ? 1600 - panelW - 36 : 36;
    const y = 900 - panelH - 36;
    const filter = [
      person('scale=1600:-2:flags=lanczos,crop=1600:900'),
      ...panels(panelW, panelH, panelW, scoreH),
      `[base][ui]overlay=${x}:${y}:shortest=1[a]`,
      `[a][score]overlay=${x}:${900 - scoreH - 36}:shortest=1,format=yuv420p[v]`,
    ].join(';');
    const file = join(outDir, `${key}.mp4`);
    ffmpeg(...inputs('desktop'), '-filter_complex', filter, '-map', '[v]', ...encode(file));
    ffmpeg(
      '-ss',
      '10.5',
      '-i',
      file,
      '-frames:v',
      '1',
      '-c:v',
      'libwebp',
      '-quality',
      '84',
      join(outDir, `${key}.webp`)
    );
  }

  {
    const [w, h] = size(join(uiDir, key, 'mobile', '0000.png'));
    const panelW = 696;
    const panelH = Math.round((h * panelW) / w / 2) * 2;
    const scoreW = 696;
    const scoreH = Math.round((cardH * scoreW) / cardW / 2) * 2;
    const y = 900 - panelH - 12;
    const sceneH = 620;
    const sceneW = Math.round((sceneH * 1600) / 907 / 2) * 2;
    const cropX = Math.max(0, Math.min(sceneW - 720, Math.round(sceneW * role.focus - 360)));
    const scene = `scale=${sceneW}:${sceneH}:flags=lanczos,crop=720:${sceneH}:${cropX}:0,pad=720:900:0:0:0x0a0a0b`;
    const filter = [
      person(scene),
      ...panels(panelW, panelH, scoreW, scoreH),
      `[base][ui]overlay=12:${y}:shortest=1[a]`,
      `[a][score]overlay=12:${900 - scoreH - 12}:shortest=1,format=yuv420p[v]`,
    ].join(';');
    const file = join(outDir, `${key}-mobile.mp4`);
    ffmpeg(...inputs('mobile'), '-filter_complex', filter, '-map', '[v]', ...encode(file));
    ffmpeg(
      '-ss',
      '10.5',
      '-i',
      file,
      '-frames:v',
      '1',
      '-c:v',
      'libwebp',
      '-quality',
      '82',
      join(outDir, `${key}-mobile.webp`)
    );
  }
  console.log(key, 'composed');
}
