(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ImageColorCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function removeColorPixels(source, target, options) {
    const tolerance = Math.max(0, Math.min(100, Number(options?.tolerance) || 0));
    const softness = Math.max(0, Math.min(50, Number(options?.softness) || 0));
    const preserveShadows = Boolean(options?.preserveShadows);
    const output = new Uint8ClampedArray(source);
    const limit = tolerance * 4.42;
    const fade = softness * 2.2;

    for (let i = 0; i < output.length; i += 4) {
      const originalAlpha = source[i + 3];
      if (originalAlpha === 0) continue;

      const dr = source[i] - target[0];
      const dg = source[i + 1] - target[1];
      const db = source[i + 2] - target[2];
      let distance = Math.sqrt(dr * dr + dg * dg + db * db);

      if (preserveShadows) {
        const lightness = (source[i] + source[i + 1] + source[i + 2]) / 3;
        if (lightness < 45) distance *= 1.32;
      }

      if (distance <= limit) {
        output[i + 3] = 0;
      } else if (fade > 0 && distance <= limit + fade) {
        const softenedAlpha = Math.round(255 * (distance - limit) / fade);
        output[i + 3] = Math.min(originalAlpha, softenedAlpha);
      }
    }

    return output;
  }

  function replaceColorPixels(source, target, replacement, options) {
    const tolerance = Math.max(0, Math.min(100, Number(options?.tolerance) || 0));
    const softness = Math.max(0, Math.min(50, Number(options?.softness) || 0));
    const preserveShadows = Boolean(options?.preserveShadows);
    const output = new Uint8ClampedArray(source);
    const limit = tolerance * 4.42;
    const fade = softness * 2.2;

    for (let i = 0; i < output.length; i += 4) {
      if (source[i + 3] === 0) continue;

      const dr = source[i] - target[0];
      const dg = source[i + 1] - target[1];
      const db = source[i + 2] - target[2];
      let distance = Math.sqrt(dr * dr + dg * dg + db * db);

      if (preserveShadows) {
        const lightness = (source[i] + source[i + 1] + source[i + 2]) / 3;
        if (lightness < 45) distance *= 1.32;
      }

      const strength = distance <= limit
        ? 1
        : fade > 0 && distance <= limit + fade
          ? 1 - (distance - limit) / fade
          : 0;

      if (strength > 0) {
        output[i] = Math.round(source[i] + (replacement[0] - source[i]) * strength);
        output[i + 1] = Math.round(source[i + 1] + (replacement[1] - source[i + 1]) * strength);
        output[i + 2] = Math.round(source[i + 2] + (replacement[2] - source[i + 2]) * strength);
      }
    }

    return output;
  }

  return { removeColorPixels, replaceColorPixels };
});
