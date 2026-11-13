/** Full browser suite for a machine with Playwright and Chromium installed. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from '../server/index.js';
let chromium;
try { ({ chromium } = await import('playwright')); }
catch { console.error('Install dependencies first: npm install\nThen: npx playwright install chromium'); process.exit(1); }
const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'test-results'); fs.mkdirSync(out, { recursive: true });
const app = await createApp({ quiet: true });
await new Promise(resolve => app.server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${app.server.address().port}`;
let browser, passed = 0; const errors = [], notes = [];
async function check(name, fn) { await fn(); passed++; console.log('PASS:', name); }
try {
  browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  const page = await context.newPage(); page.on('pageerror', e => errors.push(e.message));
  page.on('dialog', d => d.accept());
  const route = async p => { await page.goto(base + '/#/' + p); await page.locator('#main h1').waitFor(); };
  await check('Home and course counts', async () => { await route('home'); assert.equal(await page.locator('.module-card').count(), 12); assert.equal(await page.locator('.stat strong').first().textContent(), '48'); });
  await check('Keyboard search and results', async () => { await page.keyboard.press('Control+k'); await page.locator('#search-input').fill('idempotency'); assert.ok(await page.locator('.search-result').count()); await page.keyboard.press('Escape'); });
  await check('Theme survives reload', async () => { await page.locator('#theme-button').click(); await page.reload(); assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark'); await page.locator('#theme-button').click(); });
  await check('Explicit completion, bookmark, and persisted notes', async () => {
    await route('lesson/l01'); assert.equal(await page.evaluate(() => Academy.state.completed.length), 0);
    await page.locator('#complete-lesson').click(); await page.locator('#bookmark-lesson').click();
    await page.locator('#lesson-notes').fill('My documentation practice note.'); await page.reload();
    assert.equal(await page.locator('#lesson-notes').inputValue(), 'My documentation practice note.');
    assert.equal(await page.locator('#bookmark-lesson').textContent(), 'Remove bookmark');
    assert.equal(await page.locator('#complete-lesson').textContent(), 'Mark as not completed');
  });
  await check('Lesson headings and expandable model answer', async () => { assert.ok(await page.locator('#toc a').count() >= 7); const summary = page.locator('details.answer summary').first(); await summary.click(); assert.ok(await summary.locator('..').getAttribute('open') !== null); });
  await check('Quiz feedback', async () => { await route('quiz'); await page.locator('input[name="q01"][value="0"]').check(); await page.locator('[data-check="q01"]').click(); assert.match(await page.locator('#feedback-q01').textContent(), /^Correct/); });
  await check('All lesson, lab, and capstone routes', async () => {
    const paths = await page.evaluate(() => [...COURSE.lessons.map(x => 'lesson/' + x.id), ...COURSE.labs.map(x => 'lab/' + x.id), ...COURSE.capstones.map(x => 'capstone/' + x.id)]);
    for (const p of paths) { await route(p); assert.ok((await page.locator('#main').textContent()).length > 1000, p); assert.doesNotMatch(await page.locator('#main h1').textContent(), /not in this course/); }
  });
  await check('References, schema explorer, and glossary', async () => { for (const p of ['rest', 'graphql', 'openapi', 'glossary', 'labs', 'workspace', 'sources']) await route(p); await route('openapi'); await page.locator('#model-select').selectOption('Product'); assert.match(await page.locator('#model-panel').textContent(), /amountMinor/); await route('glossary'); await page.locator('#glossary-filter').fill('idempotency'); assert.ok(await page.locator('.glossary-term:visible').count() >= 1); });
  await check('Downloadable template contains real content', async () => { await route('toolkit'); const event = page.waitForEvent('download'); await page.locator('[data-download]').first().click(); const d = await event; const file = path.join(out, d.suggestedFilename()); await d.saveAs(file); assert.ok(fs.statSync(file).size > 100); });
  await check('Progress export, reset, and import', async () => {
    await route('workspace'); const event = page.waitForEvent('download'); await page.locator('#export-progress').click(); const d = await event; const backup = path.join(out, 'progress-backup.json'); await d.saveAs(backup);
    await page.locator('#reset-progress').click(); assert.equal(await page.evaluate(() => Academy.state.completed.length), 0);
    await page.locator('#import-progress').setInputFiles(backup); await page.waitForFunction(() => Academy.state.completed.includes('l01'));
  });
  await check('Real REST success and error responses', async () => {
    await route('playground/rest?operation=getProduct'); await page.waitForFunction(() => !document.querySelector('#send-request').disabled);
    await page.locator('#send-request').click(); await page.waitForFunction(() => document.querySelector('#response-meta').textContent.includes('HTTP 200'));
    assert.equal(JSON.parse(await page.locator('#response-output').textContent()).id, 'prod_1001');
    await page.locator('#request-path').fill('/api/v1/products/missing'); await page.locator('#send-request').click(); await page.waitForFunction(() => document.querySelector('#response-meta').textContent.includes('HTTP 404'));
  });
  if (app.graphql) await check('Real GraphQL execution', async () => { await route('playground/graphql?operation=get-product'); await page.waitForFunction(() => !document.querySelector('#send-request').disabled); await page.locator('#send-request').click(); await page.waitForFunction(() => document.querySelector('#response-meta').textContent.includes('HTTP 200')); assert.equal(JSON.parse(await page.locator('#response-output').textContent()).data.product.id, 'prod_1001'); });
  else { notes.push('GraphQL browser execution skipped: install runtime dependencies.'); console.log(notes.at(-1)); }
  await check('Desktop screenshot', async () => { await route('home'); await page.screenshot({ path: path.join(out, 'desktop.png'), fullPage: true }); });
  await check('Mobile layout and navigation', async () => { await page.setViewportSize({ width: 390, height: 844 }); await route('home'); assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)); await page.locator('#menu-button').click(); assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'), 'true'); await page.locator('#sidebar a[href="#/rest"]').click(); assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'), 'false'); await page.screenshot({ path: path.join(out, 'mobile.png'), fullPage: true }); });
  await check('Static reading mode does not fabricate API execution', async () => { const standalone = await context.newPage(); await standalone.route('**/health', r => r.abort()); await standalone.goto(base + '/#/playground/rest'); await standalone.waitForTimeout(500); assert.equal(await standalone.locator('#send-request').isDisabled(), true); assert.match(await standalone.locator('#response-meta').textContent(), /No request sent/); await standalone.close(); });
  await check('No uncaught browser errors', async () => assert.deepEqual(errors, []));
  fs.writeFileSync(path.join(out, 'browser-results.json'), JSON.stringify({ passed, errors, notes }, null, 2));
  console.log(`\n${passed} browser checks passed.`);
} catch (error) { console.error(error); process.exitCode = 1; }
finally { await browser?.close(); app.server.closeAllConnections(); await new Promise(resolve => app.server.close(resolve)); }
