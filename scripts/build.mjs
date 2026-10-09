import { cp, mkdir, rm } from 'node:fs/promises';
import './generate-task-pages.mjs';

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

const productionDirectories = [
  'remove-color-from-png',
  'remove-white-background-from-image'
];

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const file of productionFiles) {
  await cp(file, `dist/${file}`);
}

for (const directory of productionDirectories) {
  await cp(directory, `dist/${directory}`, { recursive: true });
}

console.log(`Built ${productionFiles.length} assets and ${productionDirectories.length} task pages in dist/`);
