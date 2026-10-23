const test = require('node:test');
const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');

test('feedback form is present and uses the protected relay', async () => {
  const [html, js, css] = await Promise.all([
    readFile('index.html', 'utf8'),
    readFile('feedback.js', 'utf8'),
    readFile('feedback.css', 'utf8')
  ]);
  assert.match(html, /feedback\.css/);
  assert.match(html, /feedback\.js/);
  assert.match(
    js,
    /site-feedback-relay\.lijunjun626\.workers\.dev\/feedback/
  );
  assert.match(js, /Images are never attached or uploaded/);
  assert.match(css, /feedback-dialog/);
});
