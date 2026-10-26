const test = require('node:test');
const assert = require('node:assert/strict');
const { removeColorPixels, replaceColorPixels } = require('./color-removal.js');

function pixel(r, g, b, a = 255) {
  return new Uint8ClampedArray([r, g, b, a]);
}

test('removes an exact color at zero tolerance', () => {
  assert.deepEqual([...removeColorPixels(pixel(53, 168, 107), [53, 168, 107], { tolerance: 0 })], [53, 168, 107, 0]);
});

test('preserves a different color at zero tolerance', () => {
  assert.deepEqual([...removeColorPixels(pixel(54, 168, 107), [53, 168, 107], { tolerance: 0 })], [54, 168, 107, 255]);
});

test('removes nearby shades when tolerance increases', () => {
  const result = removeColorPixels(pixel(65, 170, 112), [53, 168, 107], { tolerance: 5 });
  assert.equal(result[3], 0);
});

test('softens pixels just outside the removal range', () => {
  const result = removeColorPixels(pixel(78, 168, 107), [53, 168, 107], { tolerance: 4, softness: 10 });
  assert.ok(result[3] > 0 && result[3] < 255);
});

test('never makes an originally translucent pixel more opaque', () => {
  const result = removeColorPixels(pixel(78, 168, 107, 70), [53, 168, 107], { tolerance: 4, softness: 10 });
  assert.ok(result[3] <= 70);
});

test('keeps fully transparent pixels transparent', () => {
  assert.equal(removeColorPixels(pixel(0, 0, 0, 0), [255, 255, 255], { tolerance: 100, softness: 50 })[3], 0);
});

test('maximum tolerance removes the full RGB distance range', () => {
  assert.equal(removeColorPixels(pixel(0, 0, 0), [255, 255, 255], { tolerance: 100 })[3], 0);
});

test('replaces an exact color without changing opacity', () => {
  assert.deepEqual(
    [...replaceColorPixels(pixel(53, 168, 107, 120), [53, 168, 107], [255, 141, 120], { tolerance: 0 })],
    [255, 141, 120, 120]
  );
});

test('blends a nearby color into its replacement inside the soft edge', () => {
  const result = replaceColorPixels(pixel(78, 168, 107), [53, 168, 107], [255, 141, 120], { tolerance: 4, softness: 10 });
  assert.ok(result[0] > 78 && result[0] < 255);
  assert.equal(result[3], 255);
});

test('does not change unrelated or fully transparent pixels when replacing', () => {
  assert.deepEqual([...replaceColorPixels(pixel(0, 0, 0), [255, 255, 255], [1, 2, 3], { tolerance: 0 })], [0, 0, 0, 255]);
  assert.deepEqual([...replaceColorPixels(pixel(255, 255, 255, 0), [255, 255, 255], [1, 2, 3], { tolerance: 0 })], [255, 255, 255, 0]);
});
