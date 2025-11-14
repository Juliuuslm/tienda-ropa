import sharp from 'sharp';
import { promises as fs } from 'fs';
import { join } from 'path';

const sourceDir = './public/images';
const formats = ['webp', 'avif'];

async function optimizeImage(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const filename = filePath.split('/').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    const dir = filePath.split('/').slice(0, -1).join('/');

    for (const format of formats) {
      const outputPath = `${dir}/${name}.${format}`;
      if (format === 'webp') {
        await sharp(buffer)
          .webp({ quality: 80 })
          .toFile(outputPath);
      } else if (format === 'avif') {
        await sharp(buffer)
          .avif({ quality: 85 })
          .toFile(outputPath);
      }
    }

    console.log(`✓ Optimized: ${filename}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${filePath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      await optimizeImage(fullPath);
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...');
  await processDirectory(sourceDir);
  console.log('✅ Image optimization complete!');
}

main().catch(console.error);
