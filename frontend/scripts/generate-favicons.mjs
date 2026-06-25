// Generates PNG favicons (16, 32, 180) from public/favicon.svg using sharp.
// Run: node scripts/generate-favicons.mjs
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const svgPath = path.join(projectRoot, "public", "favicon.svg");
const svg = await fs.readFile(svgPath);

const sizes = [
  { name: "favicon-16.png", size: 16 },
  { name: "favicon-32.png", size: 32 },
  { name: "favicon-180.png", size: 180 },
];

for (const { name, size } of sizes) {
  const out = path.join(projectRoot, "public", name);
  await sharp(svg, { density: 512 })
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(out);
  console.log(`✅ Wrote ${out}`);
}
