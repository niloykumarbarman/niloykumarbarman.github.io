import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGETS = [
  'add-project-wizard.png',
  'bulk-import.png',
  'single-project-card.png',
  'git-branch-ops.png',
];

const devspaceDir = path.join(__dirname, '..', 'public', 'assets', 'devspace');

function fmt(b) { return (b / 1024).toFixed(1) + ' KB'; }

async function compressOne(file) {
  const fullPath = path.join(devspaceDir, file);
  if (!fs.existsSync(fullPath)) {
    console.warn(`skip (missing): ${file}`);
    return;
  }
  const before = fs.statSync(fullPath).size;
  const tmp = fullPath + '.tmp';

  await sharp(fullPath)
    .png({
      compressionLevel: 9,
      palette: true,
      quality: 90,
      effort: 10,
    })
    .toFile(tmp);

  const after = fs.statSync(tmp).size;

  if (after < before) {
    fs.renameSync(tmp, fullPath);
    const pct = Math.round(((before - after) / before) * 100);
    console.log(`${file}: ${fmt(before)} -> ${fmt(after)} (-${pct}%)`);
  } else {
    fs.unlinkSync(tmp);
    console.log(`${file}: kept original (${fmt(before)}, re-encode would be larger)`);
  }
}

(async () => {
  for (const f of TARGETS) await compressOne(f);
})();
