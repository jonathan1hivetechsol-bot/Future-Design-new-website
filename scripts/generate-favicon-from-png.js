const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

async function generate() {
  const pngPath = path.join(__dirname, '..', 'public', 'mywebfavicon.png');
  const outPath = path.join(__dirname, '..', 'public', 'favicon.ico');

  if (!fs.existsSync(pngPath)) {
    console.error('PNG source not found at', pngPath);
    process.exit(1);
  }

  const sizes = [16, 24, 32, 48, 64, 128, 256];
  const pngBuffers = [];

  for (const size of sizes) {
    const buf = await sharp(pngPath)
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers.push(buf);
  }

  const ico = await toIco(pngBuffers);
  fs.writeFileSync(outPath, ico);
  console.log('Generated', outPath);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
