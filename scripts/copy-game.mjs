// Copia a build do jogo CRA (Chef_Alerg-main/build) para public/games/cheff
// Uso: node scripts/copy-game.mjs [CAMINHO_DA_BUILD]
import fs from 'fs';
import path from 'path';

const srcArg = process.argv[2];
const defaultSrc = path.resolve(process.cwd(), '../Cheff_Alerg-main/Cheff_Alerg-main/build');
const src = srcArg ? path.resolve(process.cwd(), srcArg) : defaultSrc;
const dest = path.resolve(process.cwd(), 'public/games/cheff');

if (!fs.existsSync(src)) {
  console.error('❌ Build do jogo não encontrada em:', src);
  console.error('Informe o caminho: node scripts/copy-game.mjs ../Cheff_Alerg-main/Cheff_Alerg-main/build');
  process.exit(1);
}

// Remover destino se existir
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

function copyDir(s, d) {
  fs.mkdirSync(d, { recursive: true });
  for (const entry of fs.readdirSync(s, { withFileTypes: true })) {
    const sp = path.join(s, entry.name);
    const dp = path.join(d, entry.name);
    if (entry.isDirectory()) copyDir(sp, dp);
    else fs.copyFileSync(sp, dp);
  }
}

copyDir(src, dest);
console.log('✅ Jogo copiado para', dest);
