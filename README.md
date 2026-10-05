# Image Color Remover

Remove one selected color from an image and export the result as a transparent PNG. The entire workflow runs locally in the browser, with no image upload and no account required.

**Live tool:** [imagecolorremover.com](https://imagecolorremover.com/)

[![Image Color Remover preview](https://imagecolorremover.com/og-image.png)](https://imagecolorremover.com/)

## What it does

- Pick a color directly from a PNG, JPG, JPEG, or WebP image.
- Enter an exact HEX value when you already know the target color.
- Expand the selected range with color tolerance.
- Soften the transition around transparent edges.
- Compare the processed result with the original.
- Download a transparent PNG.
- Keep the source image on your device.

The tool works best for logos, icons, scanned signatures, green-screen graphics, simple product art, and images with a flat or consistent background color. It is intentionally a color-based tool rather than an AI subject detector.

## Privacy by architecture

Images are decoded and processed with the browser's Canvas API. The site has no upload endpoint, user account, image database, or server-side processing queue.

## Local development

Install the deployment dependency:

```sh
npm install
```

Start any static file server from the project directory, for example:

```sh
python3 -m http.server 8134
```

Then open `http://127.0.0.1:8134/`.

## Tests

```sh
npm test
```

The regression suite covers exact color matching, tolerance, edge softness, existing alpha values, already-transparent pixels, and the maximum RGB distance range.

## Production build

```sh
npm run build
```

The build script creates `dist/` and copies only the production HTML, JavaScript, crawler files, verification assets, favicon files, and social sharing image.

## Cloudflare deployment

```sh
npm run deploy:dry
npm run deploy
```

Cloudflare Workers Static Assets serves `dist/`. The small Worker in `src/worker.js` redirects `www` to the canonical apex domain and applies baseline security headers.

To deploy your own copy, update the Worker name, routes, canonical URL, sitemap, and verification files for your domain.

## Design principles

- Finish the primary task above the fold.
- Show the result before download.
- Describe the tool's limits honestly.
- Keep files private by processing locally.
- Use semantic, server-rendered HTML for search and accessibility.

## License

[MIT](LICENSE)
