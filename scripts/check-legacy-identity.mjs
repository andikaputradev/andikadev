import { execSync } from 'node:child_process';

const bannedKeywords = [
  'madebyaris',
  '\\bAris\\b',
  'Setiawan',
  'arissetia',
  'arisberikut',
  'Sidoarjo',
  'Cursor Ambassador',
  'SpaceXAI',
  'MiniMax',
  'Upwork',
  'wp.madebyaris',
  'Hongkiat',
  'Raja Kreatif',
  'DheZign',
  'SEREWare',
  'Elkabumi',
  'SAB Digital',
  'aalii',
  'bacakomik',
  'canvas garment',
  'cipika',
  '\\bcreates\\b',
  'dholistic',
  'eton house',
  'ichiban',
  'learnislam',
  'mahar pustaka',
  'mama sewa',
  'maryjardin',
  'ortensia',
  'pgn gagas',
  'picastock',
  'rahardi',
  'saudagar properti',
  'ta wan',
  'wrsdosing',
];

let totalHits = 0;
console.log('Memeriksa sisa identitas lama pada repositori...');

for (const pattern of bannedKeywords) {
  try {
    const output = execSync(
      `git grep -i -E "${pattern}" -- ":!node_modules" ":!pnpm-lock.yaml" ":!.next"`,
      { encoding: 'utf-8' }
    );
    if (output.trim()) {
      console.error(`[DITEMUKAN] "${pattern}":\n${output}`);
      totalHits++;
    }
  } catch {
    // Return code 1 berarti tidak ditemukan (bersih)
  }
}

if (totalHits === 0) {
  console.log('Hasil pemeriksaan identitas lama: BERSIH (0 temuan).');
  process.exit(0);
} else {
  console.error(`Ditemukan ${totalHits} kemunculan identitas lama.`);
  process.exit(1);
}
