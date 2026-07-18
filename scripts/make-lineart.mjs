// 一次性工具：把米色底的雕版插图转成黑白线稿透明底 PNG
// 用法：node scripts/make-lineart.mjs
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.resolve(__dirname, '..', 'assets', 'images');

// 纸色亮度以上视为背景（完全透明），墨色亮度以下视为实线（完全不透明）
const PAPER_LUM = 0.72;
const INK_LUM = 0.16;
const ALPHA_CUTOFF = 0.07; // 低于此值直接归零，去掉纸纹噪点
const INK = { r: 38, g: 32, b: 27 }; // #26201b，接近主题墨色

async function toLineArt(input, output) {
  const { data, info } = await sharp(path.join(imgDir, input))
    .grayscale()
    .normalise()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const lum = data[i] / 255;
    let alpha = (PAPER_LUM - lum) / (PAPER_LUM - INK_LUM);
    alpha = Math.max(0, Math.min(1, alpha));
    // gamma 让淡色调子更干净，保留主要线条
    alpha = Math.pow(alpha, 1.35);
    if (alpha < ALPHA_CUTOFF) alpha = 0;
    out[i * 4] = INK.r;
    out[i * 4 + 1] = INK.g;
    out[i * 4 + 2] = INK.b;
    out[i * 4 + 3] = Math.round(alpha * 255);
  }

  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(imgDir, output));
  console.log(`${input} -> ${output}`);
}

await toLineArt('finance-engraving.png', 'finance-lineart.png');
await toLineArt('data-engraving.png', 'data-lineart.png');
