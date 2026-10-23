import { mkdir, readFile, writeFile } from 'node:fs/promises';

const source = await readFile('index.html', 'utf8');

function createColorTaskPage({
  path,
  title,
  description,
  heading,
  eyebrow,
  hero,
  quickTitle,
  quick,
  accent,
  focus,
  uses,
  limits,
  related,
  faq,
}) {
  const useCards = uses
    .map(
      ([label, name, text], index) => `
        <article class="use-card"><b>0${index + 1} / ${label}</b><div><h3>${name}</h3><p>${text}</p></div></article>`
    )
    .join('');
  const faqTitle = `${title.split(' — ')[0]} FAQ`;

  return {
    path,
    title,
    description,
    heading,
    eyebrow,
    hero,
    quickTitle,
    quick,
    toolTitle: title.split(' — ')[0] + ' tool',
    accent,
    content: `
    <section class="shell section task-guide" aria-labelledby="${path}-guide-heading">
      <div class="section-head"><h2 id="${path}-guide-heading">Pick a known color.<br>Keep control.</h2><p>${focus}</p></div>
      <div class="content-grid">
        <article class="content-card"><h3>What this tool changes</h3><p>Image Color Remover compares every pixel with the color you select. Pixels inside the selected range become transparent in the downloaded PNG. Start with a narrow tolerance, then widen it only when nearby shades need to be included.</p><p>Because the processing happens in your browser, the source image is not uploaded, stored, or edited in place. The download is a new PNG and the original remains untouched.</p></article>
        <article class="content-card"><h3>How to get a clean result</h3><p>Click a clean representative area of the unwanted color. Keep tolerance low for logos, icons, diagrams, and exact digital fills. For anti-aliased edges or uneven lighting, increase tolerance gradually while watching the checkerboard.</p><p>Use a small amount of edge softness only when a hard outline remains. If an important area begins to disappear, lower the tolerance or sample a different pixel.</p></article>
        <article class="content-card"><h3>When this is the right method</h3><p>${uses[0][2]}</p><p>This method is deterministic: it follows the color range you choose instead of guessing which object is the subject. That makes it useful for artwork and flat backgrounds where you need predictable pixel-level control.</p></article>
        <article class="content-card"><h3>Important limitation</h3><p>${limits}</p><p>Export as PNG to preserve transparency. JPEG cannot store transparent pixels.</p></article>
      </div>
      <div class="quick-answer"><h2>Quick workflow</h2><p><strong>Open the image → click the unwanted color → adjust tolerance → inspect the transparent preview → download PNG.</strong> ${related}</p></div>
    </section>
    <section class="shell section" aria-labelledby="${path}-examples-heading">
      <div class="section-head"><h2 id="${path}-examples-heading">Focused jobs.<br>One chosen color.</h2><p>These examples work when the unwanted area is mostly one flat or consistently shaded color.</p></div>
      <div class="use-grid">${useCards}
      </div>
    </section>
    <section class="shell section" aria-labelledby="${path}-steps-heading">
      <div class="section-head"><h2 id="${path}-steps-heading">Make one color<br>transparent.</h2><p>Small adjustments are safer than a broad threshold, especially near important edges.</p></div>
      <div class="steps-grid">
        <article class="step-card"><b>1</b><h3>Open the source image</h3><p>Choose PNG, JPG, JPEG, or WebP. Keep the original file as your backup.</p></article>
        <article class="step-card"><b>2</b><h3>Sample the unwanted color</h3><p>Click a clear pixel, or enter a six-digit HEX value when you know the exact color.</p></article>
        <article class="step-card"><b>3</b><h3>Tune the matching range</h3><p>Raise tolerance only enough to catch related shades; add slight softness for anti-aliased edges.</p></article>
        <article class="step-card"><b>4</b><h3>Download transparent PNG</h3><p>Check the result against the checkerboard, then save a new PNG with transparency preserved.</p></article>
      </div>
    </section>`,
    faqTitle,
    faq,
  };
}

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
  },
  createColorTaskPage({
    path: 'remove-specific-color-from-image',
    title: 'Remove Specific Color From Image Online — Free & Private',
    description: 'Remove one specific color from an image online. Click the color, adjust tolerance, and download a transparent PNG. Free, private, and no upload.',
    heading: 'Remove a <span class="highlight">specific color</span><br>from an image.',
    eyebrow: 'Free specific color remover',
    hero: 'Choose the exact color you want removed, fine-tune similar shades, and download a transparent PNG. Your image stays in your browser.',
    quickTitle: 'How to remove one specific color from an image',
    quick: 'Open the image, click the unwanted color in the preview, start with low tolerance, and download the transparent PNG once the selected pixels are gone.',
    accent: '#35a86b',
    focus: 'Use this page when you know the exact color that should disappear: a colored backdrop, a logo canvas, a sticker fill, or one unwanted design element.',
    uses: [
      ['LOGO', 'Clear one canvas color around a logo', 'Click the flat color around a logo and keep tolerance narrow so the logo artwork remains intact.'],
      ['GRAPHIC', 'Remove one unwanted fill', 'Target a single fill in a diagram, icon, or presentation graphic without changing the other colors.'],
      ['STICKER', 'Make a sticker color transparent', 'Remove a known background color before placing the sticker on a new design or web page.'],
      ['SCREENSHOT', 'Clean a solid UI color', 'Clear a flat panel color from a simple screenshot when it does not overlap important interface details.'],
    ],
    limits: 'It removes color values, not objects. If the same color appears in the subject or the background has shadows, gradients, hair, or reflections, a manual mask or subject-aware tool is safer.',
    related: 'For a PNG-specific workflow, use the <a href="/remove-color-from-png/">PNG color remover</a>.',
    faq: [
      ['Can I choose an exact color to remove?', 'Yes. Click any pixel in the preview or enter its HEX color value, then adjust tolerance for similar shades.'],
      ['Does it remove only that color?', 'It removes the selected color range. Keep tolerance low when the same color appears in details you want to preserve.'],
      ['Are images uploaded?', 'No. Processing happens locally in your browser and the source image is not uploaded to our server.'],
    ],
  }),
  createColorTaskPage({
    path: 'make-color-transparent',
    title: 'Make a Color Transparent Online — Free PNG Export',
    description: 'Make one color transparent in an image online. Sample a color, control tolerance and edge softness, then download a transparent PNG. No upload.',
    heading: 'Make a <span class="highlight">color</span><br>transparent.',
    eyebrow: 'Free transparency tool',
    hero: 'Turn one selected color into transparent pixels, preview the result on a checkerboard, and download a PNG without uploading your image.',
    quickTitle: 'How to make a color transparent',
    quick: 'Open an image, click the color to make transparent, increase tolerance for nearby shades only if needed, then export the result as PNG.',
    accent: '#5b75ee',
    focus: 'Use this page when the outcome you need is transparency, not a replacement color: transparent logo canvases, overlays, icons, and simple product graphics.',
    uses: [
      ['OVERLAY', 'Prepare a transparent overlay', 'Remove one background color from a graphic so it can sit over video, a website, or another image.'],
      ['ICON', 'Export a clean transparent icon', 'Clear a known canvas color around an icon while keeping the icon pixels and crisp edges.'],
      ['ASSET', 'Reuse a flat graphic', 'Turn a single-color background transparent before reusing a graphic in a new presentation or design.'],
      ['PIXEL ART', 'Keep hard pixel edges', 'Choose zero softness and a low tolerance to preserve intentionally sharp color boundaries.'],
    ],
    limits: 'The transparency is based on color similarity. It cannot know whether a matching color belongs to the background or an important object, so inspect the preview before exporting.',
    related: 'For white or off-white canvases, see the <a href="/remove-white-background-from-image/">white background remover</a>.',
    faq: [
      ['What file format supports transparent pixels?', 'PNG supports transparency. The tool always exports PNG so the transparent pixels are preserved.'],
      ['Can I make a color partly transparent?', 'The tool uses tolerance and edge softness to produce smoother transparent edges where colors are close to the selected range.'],
      ['Will JPG keep transparency?', 'No. JPEG cannot store transparency, which is why the download is a PNG file.'],
    ],
  }),
  createColorTaskPage({
    path: 'remove-background-color-from-image',
    title: 'Remove Background Color From Image Online — Free Tool',
    description: 'Remove a solid background color from an image online. Select the background color, tune tolerance, and download a transparent PNG. No upload required.',
    heading: 'Remove a <span class="highlight">background color</span><br>from an image.',
    eyebrow: 'Free solid background remover',
    hero: 'Remove one solid or near-solid background color, inspect the transparent preview, and download a clean PNG — entirely in your browser.',
    quickTitle: 'How to remove a background color from an image',
    quick: 'Open your image, click a clear background pixel, raise tolerance gradually to include nearby shades, and download the result as a transparent PNG.',
    accent: '#f1ca4b',
    focus: 'This page is for simple backgrounds defined by one dominant color, such as a product graphic on a colored canvas, an icon tile, or an exported design asset.',
    uses: [
      ['PRODUCT', 'Clear a flat product-graphic backdrop', 'Remove a uniform colored canvas behind a product graphic when that color is not important inside the product.'],
      ['DESIGN', 'Reuse an exported design asset', 'Turn a colored artboard transparent so the asset can be placed on a different background.'],
      ['BADGE', 'Clean a colored badge canvas', 'Select the background around a badge or emblem while preserving its text and foreground shape.'],
      ['ILLUSTRATION', 'Remove one illustration backdrop', 'Use a low tolerance for a digital illustration with a consistently colored backdrop.'],
    ],
    limits: 'It is not an AI subject remover. Complex photos with shadows, gradients, hair, reflections, or multiple background colors require masking or a subject-aware editor.',
    related: 'If the background is white or almost white, use the <a href="/remove-white-background-from-image/">white background remover</a>.',
    faq: [
      ['Can I remove any background color?', 'You can remove a background that is mostly one consistent color or a narrow range of similar shades.'],
      ['Why does some background remain?', 'The background may contain different shades from lighting, gradients, or compression. Raise tolerance slowly or sample a different background pixel.'],
      ['Why did part of the subject disappear?', 'The selected color also appears in the subject or the tolerance is too broad. Lower it and try another sample.'],
    ],
  }),
  createColorTaskPage({
    path: 'remove-green-background-from-image',
    title: 'Remove Green Background From Image Online — Free & Private',
    description: 'Remove a green or green-screen-style background from a simple image online. Tune the green color range and download a transparent PNG. No upload.',
    heading: 'Remove a <span class="highlight">green</span><br>background from image.',
    eyebrow: 'Free green background remover',
    hero: 'Select a green background, tune the color range for uneven green shades, and download a transparent PNG without uploading your image.',
    quickTitle: 'How to remove a green background from an image',
    quick: 'Open the image, click a clear green background area, begin with low tolerance, and increase it gradually until the green backdrop disappears.',
    accent: '#22a06b',
    focus: 'Use this page for graphics, product cutouts, simple portraits, and other images where the unwanted backdrop is green or green-screen-like and does not overlap key subject colors.',
    uses: [
      ['GRAPHIC', 'Clear a flat green design backdrop', 'Remove a consistent green canvas behind an illustration, icon, or product graphic.'],
      ['PRODUCT', 'Prepare a product cutout', 'Make a green product-photo backdrop transparent when the product itself does not contain matching green details.'],
      ['SCREEN', 'Clean a simple green screen', 'For an evenly lit green background, sample a clean area and expand tolerance slowly at the subject edge.'],
      ['ASSET', 'Create a transparent PNG asset', 'Export a reusable transparent PNG for presentations, websites, or compositing.'],
    ],
    limits: 'Green clothing, foliage, reflections, green eyes, or uneven lighting can overlap the selected range. This color-based tool cannot separate those automatically from the background.',
    related: 'For another flat backdrop color, use the <a href="/remove-specific-color-from-image/">specific color remover</a>.',
    faq: [
      ['Can this remove a green screen?', 'It can remove a consistently colored green backdrop by color similarity. It works best when green does not appear in the subject.'],
      ['How do I avoid removing green parts of the subject?', 'Use the lowest effective tolerance and inspect the preview. If the subject contains green, use masking or a subject-aware tool instead.'],
      ['Does it work for video?', 'This page processes individual image files and exports PNG. It does not process video files.'],
    ],
  }),
  createColorTaskPage({
    path: 'remove-black-background-from-image',
    title: 'Remove Black Background From Image Online — Free PNG Tool',
    description: 'Remove a black or near-black background from a simple image online. Adjust tolerance carefully and download a transparent PNG. Private, no upload.',
    heading: 'Remove a <span class="highlight">black</span><br>background from image.',
    eyebrow: 'Free black background remover',
    hero: 'Turn a black or near-black background transparent, fine-tune dark edge shades, and download a PNG that preserves transparency.',
    quickTitle: 'How to remove a black background from an image',
    quick: 'Open the image, click a clean black background pixel, start with low tolerance, and watch the preview before removing more near-black shades.',
    accent: '#161616',
    focus: 'Use this page for icons, logos, simple graphics, and images with a distinct black canvas. It is best when the foreground does not contain important black details.',
    uses: [
      ['LOGO', 'Clear a black logo canvas', 'Remove a black rectangle around a logo while retaining contrasting artwork and text.'],
      ['ICON', 'Make a dark icon background transparent', 'Select the black canvas behind an icon and preserve the colored foreground.'],
      ['ASSET', 'Reuse a dark-background graphic', 'Export a transparent version of a simple graphic for use over another background.'],
      ['STICKER', 'Clean a black sticker edge', 'Use small tolerance adjustments to handle nearly black anti-aliased edge pixels.'],
    ],
    limits: 'Black shadows, outlines, hair, clothing, and dark product details can match the background. A broad tolerance may erase them, so this is not suitable for complex photographs.',
    related: 'For a different flat color, open the <a href="/remove-color-from-png/">PNG color remover</a>.',
    faq: [
      ['Can I remove a near-black background?', 'Yes. Sample the actual dark pixel and increase tolerance gradually to include nearby near-black shades.'],
      ['Why did dark details disappear?', 'They match the selected black range. Reduce tolerance or use a masking tool when those details need to remain.'],
      ['Can I export with a transparent background?', 'Yes. The tool downloads a PNG, which retains the transparency created by the selected color range.'],
    ],
  }),
  createColorTaskPage({
    path: 'remove-color-from-logo',
    title: 'Remove Color From Logo Online — Make Logo Background Transparent',
    description: 'Remove one color from a logo online and export a transparent PNG. Click the logo background, keep edges crisp, and download privately with no upload.',
    heading: 'Remove color<br>from a <span class="highlight">logo.</span>',
    eyebrow: 'Free logo color remover',
    hero: 'Clear one logo background or unwanted fill color, preserve crisp edges, and download a transparent PNG without uploading your design.',
    quickTitle: 'How to remove a color from a logo',
    quick: 'Open the logo, click the unwanted canvas color, keep tolerance low for exact fills, inspect the checkerboard, and download the transparent PNG.',
    accent: '#ef6b5b',
    focus: 'Use this page for logo files with a flat color canvas or one unwanted fill. It gives you direct control over the exact pixels that become transparent.',
    uses: [
      ['BRAND', 'Clear a colored logo canvas', 'Remove the solid rectangle behind a logo before using it on a website, document, or presentation.'],
      ['ICON', 'Remove one logo fill', 'Target a single unwanted fill color in a simple icon or mark while keeping the rest of the logo.'],
      ['EXPORT', 'Prepare a transparent PNG', 'Convert an existing logo export into a transparent PNG for flexible reuse.'],
      ['PIXEL', 'Preserve crisp graphic edges', 'Start with tolerance near zero and no softness for logos made with exact digital colors.'],
    ],
    limits: 'If the same color appears inside the logo artwork, it can disappear too. Complex logos with gradients, shadows, and textured backgrounds may need a layered editor or vector source file.',
    related: 'For pale edges after removal, try the <a href="/remove-white-halo-from-png/">white halo cleaner</a>.',
    faq: [
      ['Can I make a logo background transparent?', 'Yes. Select the flat background color around the logo and export the result as a transparent PNG.'],
      ['Will the logo itself stay unchanged?', 'The tool changes pixels matching the selected range. Use low tolerance when the logo contains a similar color you want to keep.'],
      ['Does this work with JPG logos?', 'Yes, but the download is PNG because PNG is required to keep the new transparent background.'],
    ],
  }),
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
