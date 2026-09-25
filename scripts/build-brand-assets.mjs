// Generates transparent logo variants, favicons and the social share image
// from the original white-background JPG. Run with: npm run brand
import sharp from 'sharp';

const SRC = 'src/assets/brand/logo-original.jpg';
const CREAM = [246, 239, 226];
const TEAL = '#062a2e';

const { data, info } = await sharp(SRC)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height } = info;

// "Colour to alpha" against white: every pixel is treated as a mix of an
// ink colour and the white paper, so anti-aliased edges stay smooth.
function unmix(r, g, b) {
  let a = 1 - Math.min(r, g, b) / 255;
  if (a < 0.08) return null;
  const c = [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(255 - (255 - v) / a))));
  const neutral = Math.max(...c) - Math.min(...c) < 70;
  return { c, a, neutral };
}

// mode: 'light' keeps original ink, 'dark' turns the black wordmark cream,
// 'mark' keeps only the gold pin and drops the wordmark.
function render(mode) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0, o = 0; i < data.length; i += 3, o += 4) {
    const px = unmix(data[i], data[i + 1], data[i + 2]);
    if (!px) continue;
    if (mode === 'mark' && px.neutral) continue;
    const c = mode === 'dark' && px.neutral ? CREAM : px.c;
    out[o] = c[0];
    out[o + 1] = c[1];
    out[o + 2] = c[2];
    out[o + 3] = Math.round(px.a * 255);
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

async function trimmed(mode, pad = 8) {
  const buf = await render(mode).png().toBuffer();
  return sharp(buf)
    .trim()
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

const onDark = await trimmed('dark');
const onLight = await trimmed('light');
const mark = await trimmed('mark', 0);

await sharp(onDark).png().toFile('src/assets/brand/logo-on-dark.png');
await sharp(onLight).png().toFile('src/assets/brand/logo-on-light.png');
await sharp(mark).png().toFile('src/assets/brand/logo-mark.png');

async function icon(size, file, radius = 0.22) {
  const r = Math.round(size * radius);
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${TEAL}"/></svg>`,
  );
  const inner = await sharp(mark)
    .resize({ width: Math.round(size * 0.72), height: Math.round(size * 0.72), fit: 'inside' })
    .toBuffer();
  await sharp(bg).composite([{ input: inner, gravity: 'center' }]).png().toFile(file);
}

await icon(96, 'public/favicon.png');
await icon(180, 'public/apple-touch-icon.png', 0);
await icon(512, 'public/icon-512.png');

// 1200x630 share image: deep teal field, soft gold glow, logo centred.
const og = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g" cx="78%" cy="18%" r="70%">
      <stop offset="0" stop-color="#e2b85a" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#e2b85a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="b" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b3b3e"/><stop offset="1" stop-color="#041c1e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#b)"/>
  <rect width="1200" height="630" fill="url(#g)"/>
</svg>`);
const ogLogo = await sharp(onDark).resize({ width: 720 }).toBuffer();
await sharp(og).composite([{ input: ogLogo, gravity: 'center' }]).jpeg({ quality: 88 }).toFile('public/og-image.jpg');

console.log('Brand assets written.');
