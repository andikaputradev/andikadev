import sharp from 'sharp';
import fs from 'node:fs';

async function makeIco(buffers, path) {
  // buffers: [{ width, height, data: Buffer }]
  const count = buffers.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4); // count

  const entries = [];
  const datas = [];

  for (const item of buffers) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.data.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset

    entries.push(entry);
    datas.push(item.data);
    offset += item.data.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...datas]);
  fs.writeFileSync(path, icoBuffer);
  console.log(`Generated ICO at ${path} (${icoBuffer.length} bytes)`);
}

async function run() {
  const source = 'public/brand/logo-sumber.jpg';

  // 1. Generate PNG 16, 32, 48 with guaranteed RGBA (4 channels)
  const png16 = await sharp(source).resize(16, 16).ensureAlpha().png().toBuffer();
  const png32 = await sharp(source).resize(32, 32).ensureAlpha().png().toBuffer();
  const png48 = await sharp(source).resize(48, 48).ensureAlpha().png().toBuffer();

  // Write app/favicon.ico and public/favicon.ico
  await makeIco([
    { width: 16, height: 16, data: png16 },
    { width: 32, height: 32, data: png32 },
    { width: 48, height: 48, data: png48 },
  ], 'app/favicon.ico');

  await makeIco([
    { width: 16, height: 16, data: png16 },
    { width: 32, height: 32, data: png32 },
    { width: 48, height: 48, data: png48 },
  ], 'public/favicon.ico');

  // 2. Generate app/icon.png and app/apple-icon.png (192 and 180)
  await sharp(source).resize(192, 192).png().toFile('app/icon.png');
  await sharp(source).resize(192, 192).png().toFile('public/icon.png');
  await sharp(source).resize(180, 180).png().toFile('app/apple-icon.png');
  await sharp(source).resize(180, 180).png().toFile('public/apple-icon.png');
  await sharp(source).resize(512, 512).png().toFile('public/logo.png');

  console.log('Semua aset icon website berhasil dibuat dari public/brand/logo-sumber.jpg');
}

run().catch(console.error);
