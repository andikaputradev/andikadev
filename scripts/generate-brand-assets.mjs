import sharp from 'sharp'

async function generateAssets() {
  const logoSource = 'public/brand/logo-sumber.jpg'
  const fotoSource = 'public/brand/foto-profil.jpg'

  const logoMeta = await sharp(logoSource).metadata()
  const fotoMeta = await sharp(fotoSource).metadata()

  console.log('Sumber Logo:', logoMeta.width, 'x', logoMeta.height, logoMeta.format)
  console.log('Sumber Foto Profil:', fotoMeta.width, 'x', fotoMeta.height, fotoMeta.format)

  // 1. public/logo.png (512 px)
  await sharp(logoSource)
    .resize(512, 512, { fit: 'contain' })
    .png()
    .toFile('public/logo.png')
  const logoOut = await sharp('public/logo.png').metadata()
  console.log('public/logo.png:', logoOut.width, 'x', logoOut.height, logoOut.format)

  // 2. app/icon.png (180 px)
  await sharp(logoSource)
    .resize(180, 180, { fit: 'contain' })
    .png()
    .toFile('app/icon.png')
  const iconOut = await sharp('app/icon.png').metadata()
  console.log('app/icon.png:', iconOut.width, 'x', iconOut.height, iconOut.format)

  // 3. app/apple-icon.png (180 px)
  await sharp(logoSource)
    .resize(180, 180, { fit: 'contain' })
    .png()
    .toFile('app/apple-icon.png')
  const appleIconOut = await sharp('app/apple-icon.png').metadata()
  console.log('app/apple-icon.png:', appleIconOut.width, 'x', appleIconOut.height, appleIconOut.format)

  // 4. public/foto-profil.webp (640 and 1280)
  // 640w
  await sharp(fotoSource)
    .resize(640, 800, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile('public/foto-profil.webp')
  const foto640Out = await sharp('public/foto-profil.webp').metadata()
  console.log('public/foto-profil.webp (640):', foto640Out.width, 'x', foto640Out.height, foto640Out.format)

  await sharp(fotoSource)
    .resize(640, 800, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile('public/foto-profil-640.webp')

  // 1280w
  await sharp(fotoSource)
    .resize(1280, 1600, { fit: 'cover', kernel: 'lanczos3' })
    .webp({ quality: 85 })
    .toFile('public/foto-profil-1280.webp')
  const foto1280Out = await sharp('public/foto-profil-1280.webp').metadata()
  console.log('public/foto-profil-1280.webp (1280):', foto1280Out.width, 'x', foto1280Out.height, foto1280Out.format)

  // 5. public/og.png (1200 x 630)
  // Create logo thumbnail for OG
  const ogLogoBuffer = await sharp(logoSource)
    .resize(200, 200, { fit: 'contain' })
    .png()
    .toBuffer()

  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#09090b" />
          <stop offset="100%" stop-color="#18181b" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bgGrad)" />
      
      <!-- Border outline -->
      <rect x="28" y="28" width="1144" height="574" rx="20" fill="none" stroke="#27272a" stroke-width="2" />
      
      <!-- Domain Pill -->
      <g transform="translate(500, 395)">
        <rect x="0" y="0" width="200" height="42" rx="21" fill="#18181b" stroke="#f97316" stroke-width="1.5" />
        <text x="100" y="27" font-family="sans-serif" font-size="18" font-weight="bold" fill="#f97316" text-anchor="middle">andikadev.com</text>
      </g>

      <!-- Brand Name -->
      <text x="600" y="355" font-family="sans-serif" font-size="52" font-weight="bold" fill="#fafafa" text-anchor="middle" letter-spacing="-1">Andika Putra Dev</text>
      
      <!-- Tagline -->
      <text x="600" y="480" font-family="sans-serif" font-size="22" font-weight="500" fill="#a1a1aa" text-anchor="middle">Website, Aplikasi Mobile, Keamanan Siber dan Web3</text>
    </svg>
  `)

  // Composite background SVG with Logo at (500, 85)
  await sharp(svgOverlay)
    .composite([
      {
        input: ogLogoBuffer,
        top: 85,
        left: 500,
      }
    ])
    .png()
    .toFile('public/og.png')

  const ogOut = await sharp('public/og.png').metadata()
  console.log('public/og.png:', ogOut.width, 'x', ogOut.height, ogOut.format)
}

generateAssets().catch((err) => {
  console.error(err)
  process.exit(1)
})
