import { mkdir, readFile, writeFile } from 'node:fs/promises';

const source = await readFile('index.html', 'utf8');

const pages = [
  {
    path: 'remove-color-from-png',
    title: 'Remove Color From PNG Online — Make It Transparent',
    description: 'Remove one specific color from a PNG online. Click a color, adjust tolerance, preview transparent pixels, and download a clean PNG. No upload or sign-up.',
    heading: 'Remove color<br>from <span class="highlight">PNG.</span>',
    eyebrow: 'Free PNG color remover',
    hero: 'Open a PNG, click the color you want gone, and download a new PNG with transparent pixels. Your image stays in your browser.',
    quickTitle: 'How to remove a color from a PNG',
    quick: 'Choose a PNG, click the unwanted color in the preview, increase tolerance only enough to include nearby shades, then download the transparent result. Processing happens locally on your device.',
    toolTitle: 'Remove color from PNG tool',
    accent: '#35a86b',
    content: `
    <section class="shell section task-guide" aria-labelledby="png-guide-heading">
      <div class="section-head"><h2 id="png-guide-heading">Remove one color.<br>Keep PNG transparency.</h2><p>This page is for a precise job: turning one chosen color in a PNG into transparent pixels. The original file is not changed, and no image is sent to a server.</p></div>
      <div class="content-grid">
        <article class="content-card"><h3>What this PNG color remover does</h3><p>The tool reads the red, green, and blue values of each pixel and compares them with the color you select. Exact matches become transparent at a tolerance of zero. A higher tolerance includes nearby shades, which can help with anti-aliased edges, gradients, compression, and small lighting differences.</p><p>The result downloads as PNG because PNG supports an alpha channel. That alpha channel stores transparent and partially transparent pixels, so the cleaned image can sit on a website, slide, document, or design without a colored box around it.</p></article>
        <article class="content-card"><h3>Best uses and honest limits</h3><p>Color-based removal works well for logos, icons, pixel art, stickers, diagrams, screenshots, scanned signatures, and graphics with a flat background. It is especially useful when you know the exact color to clear and want direct control instead of automatic subject detection.</p><p>It is not an AI background remover. If a photograph has trees, hair, reflections, or many background colors, a single color sample cannot describe the whole background. The same color may also appear inside the subject. In those cases, use a mask or an AI subject-removal tool.</p></article>
        <article class="content-card"><h3>How to get a cleaner transparent edge</h3><p>Click a clean, representative part of the unwanted color. Start with low tolerance and raise it gradually while watching the checkerboard preview. Stop when the unwanted pixels disappear. If part of the subject vanishes, lower the tolerance or sample a different pixel.</p><p>Edge softness creates partial transparency around the cutoff, which can reduce a hard halo. For logos and pixel art, a low softness value usually keeps edges crisp. For anti-aliased artwork, a small amount of softness can make the transition look more natural.</p></article>
        <article class="content-card"><h3>Privacy and file handling</h3><p>The selected image is decoded and processed by JavaScript and Canvas in your browser. The tool does not upload the source image, require an account, or store a copy on our server. Closing or refreshing the page clears the current working image from the page.</p><p>You can open PNG, JPG, JPEG, or WebP files, but the output is always PNG so transparency is preserved. Keep your original file: the download creates a new file whose name ends in <code>-transparent.png</code>.</p></article>
      </div>
      <div class="quick-answer"><h2>PNG color removal checklist</h2><p><strong>Choose the PNG → click the unwanted color → tune tolerance → inspect the checkerboard → download the transparent PNG.</strong> For a white or nearly white background, use the dedicated <a href="/remove-white-background-from-image/">white background remover guide and tool</a>.</p></div>
    </section>
    <section class="shell section" aria-labelledby="png-examples-heading">
      <div class="section-head"><h2 id="png-examples-heading">Three PNG jobs<br>this tool handles well.</h2><p>These examples all depend on selecting a known pixel color, not detecting a person or object.</p></div>
      <div class="use-grid">
        <article class="use-card"><b>01 / BRAND ASSET</b><div><h3>Clear a color behind a logo</h3><p>Click the flat canvas color around a PNG logo. Keep tolerance low so the logo colors and existing transparent pixels remain intact.</p></div></article>
        <article class="use-card"><b>02 / ICON</b><div><h3>Remove one fill from an icon</h3><p>Target a single unwanted fill in a simple icon or sticker. Use a tolerance near zero when the artwork uses exact digital colors.</p></div></article>
        <article class="use-card"><b>03 / PIXEL ART</b><div><h3>Make a sprite color transparent</h3><p>Select the designated background color and use zero softness to preserve hard pixel edges in sprites and retro graphics.</p></div></article>
        <article class="use-card"><b>04 / EXISTING ALPHA</b><div><h3>Keep transparent areas transparent</h3><p>The tool preserves pixels that already have zero alpha while making the newly selected color transparent in the exported PNG.</p></div></article>
      </div>
    </section>
    <section class="shell section" aria-labelledby="png-steps-heading">
      <div class="section-head"><h2 id="png-steps-heading">A precise PNG<br>workflow.</h2><p>Start narrow, inspect the result, and expand the selected color range only when the artwork needs it.</p></div>
      <div class="steps-grid">
        <article class="step-card"><b>1</b><h3>Open the original PNG</h3><p>Choose the highest-quality source available. Existing transparency is retained.</p></article>
        <article class="step-card"><b>2</b><h3>Sample the unwanted color</h3><p>Click a representative pixel or enter its six-digit HEX value.</p></article>
        <article class="step-card"><b>3</b><h3>Tune for the artwork</h3><p>Use low tolerance for exact fills; add a little tolerance and softness for anti-aliased edges.</p></article>
        <article class="step-card"><b>4</b><h3>Download a new PNG</h3><p>Inspect the checkerboard, export the result, and keep the untouched source file.</p></article>
      </div>
    </section>`,
    faqTitle: 'Remove color from PNG FAQ',
    faq: [
      ['Can I remove one specific color from a PNG?', 'Yes. Open the PNG, click that color in the preview, adjust tolerance for similar shades, and download a new PNG with those pixels made transparent.'],
      ['Will the PNG lose transparency it already has?', 'No. Pixels that are already transparent stay transparent. The tool only changes the alpha value of pixels that match the selected color range.'],
      ['Why are some colored pixels still visible?', 'They may be a slightly different shade because of anti-aliasing, gradients, or compression. Increase tolerance gradually, or click a more representative pixel.'],
      ['Why did part of my subject disappear?', 'The selected color also exists in the subject or the tolerance is too high. Lower tolerance, choose another sample, or use a masking tool for complex images.'],
      ['Are PNG files uploaded?', 'No. The PNG is processed locally in your browser and does not need to be sent to our server.']
    ]
  },
  {
    path: 'remove-white-background-from-image',
    title: 'Remove White Background From Image Online — Free & Private',
    description: 'Remove a white or near-white background from an image and download a transparent PNG. Adjust tolerance for off-white edges. Free, private, and no upload.',
    heading: 'Remove <span class="highlight">white</span><br>background from image.',
    eyebrow: 'Free white background remover',
    hero: 'Remove a white background from an image by selecting white or an off-white shade. Adjust edge tolerance and download a transparent PNG — without uploading your image.',
    quickTitle: 'How to remove a white background from an image',
    quick: 'Open the image, choose white (#FFFFFF) or click a clean background area, adjust tolerance until the white edge disappears, and download the result as a transparent PNG.',
    toolTitle: 'White background remover tool',
    accent: '#ffffff',
    content: `
    <section class="shell section task-guide" aria-labelledby="white-guide-heading">
      <div class="section-head"><h2 id="white-guide-heading">Turn white pixels<br>transparent.</h2><p>This page removes backgrounds by color similarity. It is designed for white and near-white fields around logos, icons, signatures, product graphics, and simple images.</p></div>
      <div class="content-grid">
        <article class="content-card"><h3>What “remove white background” means here</h3><p>The tool does not guess which object is the subject. Instead, it makes pixels transparent when their color is close to the selected white value. Pure white is #FFFFFF, but photographed paper, scanned documents, and exported graphics often contain off-white, gray, or anti-aliased edge pixels.</p><p>That is why the tolerance control matters. Start low for a clean digital graphic. Increase it gradually for cream paper, light gray edges, or JPEG artifacts. The checkerboard preview shows the pixels that will be transparent before you download.</p></article>
        <article class="content-card"><h3>When this works better than AI</h3><p>Use color-based removal when the background is consistently white and you want predictable pixel-level control. Common examples include a logo inside a white rectangle, an icon exported with a white canvas, a dark signature on paper, a line drawing, or a product graphic created against white.</p><p>Because the browser follows the color threshold you choose, it does not invent missing edges or send the image to a model. It is fast, repeatable, and useful for private or unpublished assets that should remain on your device.</p></article>
        <article class="content-card"><h3>When to use another tool</h3><p>This is not AI subject segmentation. A complex photograph can contain a white shirt, white eyes, reflections, snow, or pale details that you want to keep. Raising tolerance may remove those areas along with the background. Busy backgrounds also cannot be described by one white color.</p><p>For hair, fur, translucent objects, shadows across a photographic backdrop, or scenes with many colors, use an AI background remover or manual masking editor. For a simple white field, this color-based method is usually more direct.</p></article>
        <article class="content-card"><h3>How to avoid a white halo</h3><p>Click the white background close to the subject edge, then raise tolerance a little at a time. A small edge-softness value can blend partially matching edge pixels. If the subject becomes translucent, reduce tolerance first; too much softness can also blur a crisp logo.</p><p>The output downloads as PNG because JPEG cannot store transparency. Place the PNG over a dark test background to spot any remaining white fringe, then return and fine-tune the controls if needed.</p></article>
      </div>
      <div class="quick-answer"><h2>White background removal checklist</h2><p><strong>Open the image → select white or click the background → raise tolerance slowly → check light details → download PNG.</strong> To remove a different flat color from a PNG, use the <a href="/remove-color-from-png/">PNG color remover</a>.</p></div>
    </section>
    <section class="shell section" aria-labelledby="white-examples-heading">
      <div class="section-head"><h2 id="white-examples-heading">Where white-background<br>removal works best.</h2><p>Use this method when the background is a consistent white or near-white field and important parts of the subject are darker.</p></div>
      <div class="use-grid">
        <article class="use-card"><b>01 / LOGO</b><div><h3>Make a white logo box transparent</h3><p>Select the empty white area around the logo, then raise tolerance just enough to clear the anti-aliased white fringe.</p></div></article>
        <article class="use-card"><b>02 / SCAN</b><div><h3>Remove paper behind a signature</h3><p>Sample the actual paper color instead of assuming pure white. Cream and gray paper often need a moderate tolerance.</p></div></article>
        <article class="use-card"><b>03 / PRODUCT GRAPHIC</b><div><h3>Clear a white product backdrop</h3><p>This works for simple catalog-style graphics when the product does not contain important white highlights or white parts.</p></div></article>
        <article class="use-card"><b>04 / LINE ART</b><div><h3>Keep dark marks, clear the page</h3><p>Convert white paper pixels to transparency while retaining darker handwriting, stamps, sketches, or printed lines.</p></div></article>
      </div>
    </section>
    <section class="shell section" aria-labelledby="white-steps-heading">
      <div class="section-head"><h2 id="white-steps-heading">How to make a white<br>background transparent.</h2><p>The safe approach is to begin with a narrow white range and watch the subject as you widen it.</p></div>
      <div class="steps-grid">
        <article class="step-card"><b>1</b><h3>Open the image</h3><p>Use PNG for existing transparency or open JPG and WebP when the source has a solid white canvas.</p></article>
        <article class="step-card"><b>2</b><h3>Choose the real background white</h3><p>Keep #FFFFFF for pure white, or click the page or backdrop to sample its actual off-white value.</p></article>
        <article class="step-card"><b>3</b><h3>Watch light subject details</h3><p>Increase tolerance slowly. Stop or lower it if a white shirt, reflection, snow, eye, or pale product detail begins to disappear.</p></article>
        <article class="step-card"><b>4</b><h3>Check for a halo and export</h3><p>Add slight edge softness only if needed, inspect against the checkerboard, and download the transparent PNG.</p></article>
      </div>
    </section>`,
    faqTitle: 'White background remover FAQ',
    faq: [
      ['Can I remove a white background without uploading the image?', 'Yes. The image is processed locally in your browser. It does not need to be uploaded to our server.'],
      ['How do I remove an off-white background?', 'Click an off-white background pixel or enter its HEX value, then increase tolerance gradually to include nearby light shades.'],
      ['Why is there a white outline around the subject?', 'Anti-aliased edge pixels are not pure white. Increase tolerance slightly and add a small amount of edge softness while watching the preview.'],
      ['Will this remove white areas inside the subject?', 'It can. This tool removes pixels by color, not by object. If white details must remain, use a lower tolerance or a subject-aware masking tool.'],
      ['Is this an AI background remover?', 'No. It removes a selected color range. It is best for consistent white backgrounds; AI tools are usually better for complex photographic scenes.']
    ]
  }
];

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

for (const page of pages) {
  const url = `https://imagecolorremover.com/${page.path}/`;
  const faqEntities = page.faq.map(([name, text]) => ({
    '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text }
  }));
  const schemas = `
  <script type="application/ld+json">${escapeJson({
    '@context': 'https://schema.org', '@type': 'WebApplication', name: page.title.split(' — ')[0], url,
    applicationCategory: 'MultimediaApplication', operatingSystem: 'Any', isAccessibleForFree: true,
    browserRequirements: 'Requires a modern browser with HTML Canvas and JavaScript enabled.',
    description: page.description, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: ['Local browser processing', 'Color tolerance control', 'Edge softness control', 'Transparent PNG download']
  })}</script>
  <script type="application/ld+json">${escapeJson({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntities })}</script>
  <script type="application/ld+json">${escapeJson({
    '@context': 'https://schema.org', '@type': 'HowTo', name: page.quickTitle,
    step: ['Open an image', 'Select the unwanted color', 'Adjust tolerance and edge softness', 'Download the transparent PNG'].map((text, index) => ({ '@type': 'HowToStep', position: index + 1, name: text, text }))
  })}</script>`;

  const faqHtml = page.faq.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('\n        ');
  let html = source
    .replace(/<title>[^<]+<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description" content="[^"]+">/, `<meta name="description" content="${page.description}">`)
    .replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:url" content="[^"]+">/, `<meta property="og:url" content="${url}">`)
    .replace(/<meta property="og:title" content="[^"]+">/, `<meta property="og:title" content="${page.title.split(' — ')[0]}">`)
    .replace(/<meta property="og:description" content="[^"]+">/, `<meta property="og:description" content="${page.description}">`)
    .replace(/<meta name="twitter:title" content="[^"]+">/, `<meta name="twitter:title" content="${page.title.split(' — ')[0]}">`)
    .replace(/<meta name="twitter:description" content="[^"]+">/, `<meta name="twitter:description" content="${page.description}">`)
    .replace(/  <script type="application\/ld\+json">[\s\S]*?<\/script>\n  <script type="application\/ld\+json">[\s\S]*?<\/script>\n  <script type="application\/ld\+json">[\s\S]*?<\/script>/, schemas)
    .replace('<p class="eyebrow">Free browser-based image tool</p><h1>Remove <span class="highlight">color</span><br>from image.</h1><p class="hero-copy">Pick the color you want gone, tune the tolerance, and download a transparent PNG. Nothing leaves your device.</p>', `<p class="eyebrow">${page.eyebrow}</p><h1>${page.heading}</h1><p class="hero-copy">${page.hero}</p>`)
    .replace('<h2 id="quick-answer-heading">How to remove a color from an image</h2><p>Open the file, click the color in the preview, adjust tolerance to include similar shades, and download the result as a transparent PNG. The entire process runs locally in your browser.</p>', `<h2 id="quick-answer-heading">${page.quickTitle}</h2><p>${page.quick}</p>`)
    .replace('<h2 id="tool-heading">Image color remover tool</h2>', `<h2 id="tool-heading">${page.toolTitle}</h2>`)
    .replace('value="#35a86b" aria-label="Color to remove"', `value="${page.accent}" aria-label="Color to remove"`)
    .replace('id="hex-input" value="#35A86B"', `id="hex-input" value="${page.accent.toUpperCase()}"`)
    .replace(/    <section class="shell section" id="examples"[\s\S]*?    <section class="shell section" id="faq">/, `${page.content}\n\n    <section class="shell section" id="faq">`)
    .replace(/<div class="faq"><p class="eyebrow">Common questions<\/p><h2>Image color remover FAQ<\/h2>[\s\S]*?<\/div>\n    <\/section>/, `<div class="faq"><p class="eyebrow">Common questions</p><h2>${page.faqTitle}</h2>\n        ${faqHtml}\n      </div>\n    </section>`)
    .replace('<script src="./color-removal.js"></script>', '<script src="/color-removal.js"></script>')
    .replace("colorPicker.value='#35a86b'; hexInput.value='#35A86B';", `colorPicker.value='${page.accent}'; hexInput.value='${page.accent.toUpperCase()}';`);

  if (page.accent === '#ffffff') {
    html = html.replace("drawDemo();\n  </script>", "drawPreset('white-logo');\n  </script>");
  }

  await mkdir(page.path, { recursive: true });
  await writeFile(`${page.path}/index.html`, html);
}

console.log(`Generated ${pages.length} task pages.`);
