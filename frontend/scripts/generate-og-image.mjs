// Generates public/og-image.png (1200x630) from public/og-image.svg using sharp.
// Run: node scripts/generate-og-image.mjs
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const svgPath = path.join(projectRoot, "public", "og-image.svg");
const pngPath = path.join(projectRoot, "public", "og-image.png");

const svg = await fs.readFile(svgPath);

await sharp(svg, { density: 300 })
  .resize(1200, 630, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ quality: 92, compressionLevel: 9 })
  .toFile(pngPath);

console.log(`✅ Wrote ${pngPath}`);
