import { cp, mkdir, rm } from 'node:fs/promises';

const productionFiles = [
  'index.html',
  'color-removal.js',
  'favicon.svg',
  'favicon-48.png',
  'apple-touch-icon.png',
  'og-image.png',
  'llms.txt',
  '656ebc8c6f6bb4f5e447d9c73e296efb.txt',
  'robots.txt',
  'sitemap.xml'
];

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const file of productionFiles) {
  await cp(file, `dist/${file}`);
}

console.log(`Built ${productionFiles.length} production assets in dist/`);
