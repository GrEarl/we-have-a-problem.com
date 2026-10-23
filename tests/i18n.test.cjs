// Run with: node --test tests/i18n.test.cjs
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const japanese = readFileSync(join(__dirname, '..', 'ja.js'), 'utf8');
const setup = html.match(/<script>([\s\S]*?)\/\/ Hosts under test\./)[1];
const dictionary = vm.runInNewContext(`${japanese}\nJA`);
const englishTitle = 'eMudhra Intermediate CA Compromise';
const englishDescription = html.match(/<meta name="description" content="([^"]*)"/)[1];

function render(languages, search = '', options = {}) {
  const element = (tagName, innerHTML) => ({ tagName, innerHTML, lang: 'en', closest: () => null });
  const title = element('TITLE', options.title ?? englishTitle);
  const meta = { content: options.description ?? englishDescription };
  const blocks = (options.fragments || []).map(english => element('P', english));
  const links = ['en', 'ja'].map(language => ({ dataset: { language } }));
  const listeners = {};
  const document = {
    documentElement: { lang: 'en' },
    querySelectorAll: selector => selector === '[data-language]' ? links :
      selector === 'meta[content]' ? [meta] : [title, ...blocks],
  };
  const location = new URL(`https://example.com/${search}#check`);
  const context = vm.createContext({
    URL, URLSearchParams, document, location,
    navigator: { languages, language: 'ja-JP' },
    window: { addEventListener: (name, callback) => { listeners[name] = callback; } },
  });
  if (options.loadTranslation !== false) vm.runInContext(japanese, context);
  vm.runInContext(setup, context);
  return { document, title, meta, blocks, links, location, listeners, context };
}

test('selects the first supported browser language, with an English fallback', () => {
  for (const [languages, expected] of [
    [['ja-JP', 'en-US'], 'ja'],
    [['JA'], 'ja'],
    [['en-US', 'ja'], 'en'],
    [['fr-CA', 'ja'], 'ja'],
    [['fr', 'de'], 'en'],
    [undefined, 'ja'],
    [[], 'ja'],
    [[undefined], 'en'],
  ]) {
    assert.equal(render(languages).document.documentElement.lang, expected);
  }
});

test('explicit supported language overrides browser preference; invalid choices fall back', () => {
  assert.equal(render(['en'], '?lang=ja').document.documentElement.lang, 'ja');
  assert.equal(render(['ja'], '?lang=en').document.documentElement.lang, 'en');
  assert.equal(render(['ja'], '?lang=fr').document.documentElement.lang, 'ja');
});

test('translates text and metadata, retaining English if Japanese is unavailable', () => {
  const ja = render(['ja']);
  assert.equal(ja.title.innerHTML, dictionary[englishTitle]);
  assert.equal(ja.title.lang, 'ja');
  assert.equal(ja.meta.content, dictionary[englishDescription] ?? englishDescription);
  for (const page of [render(['en']), render(['ja'], '', { loadTranslation: false })]) {
    assert.equal(page.document.documentElement.lang, 'en');
    assert.equal(page.title.innerHTML, englishTitle);
    assert.equal(page.meta.content, englishDescription);
  }
});

test('changed and added English remains English while unchanged fragments stay Japanese', () => {
  const changedTitle = englishTitle + ' — Updated';
  const changedDescription = englishDescription + ' New information.';
  const added = 'New upstream information that has not been translated.';
  const page = render(['ja'], '', {
    title: changedTitle, description: changedDescription, fragments: [added, englishTitle],
  });
  assert.equal(page.title.innerHTML, changedTitle);
  assert.equal(page.title.lang, 'en');
  assert.equal(page.meta.content, changedDescription);
  assert.equal(page.blocks[0].innerHTML, added);
  assert.equal(page.blocks[0].lang, 'en');
  assert.equal(page.blocks[1].innerHTML, dictionary[englishTitle]);
  assert.equal(page.blocks[1].lang, 'ja');
});

test('changed links or inline code invalidate the entire fragment', () => {
  const linked = Object.keys(dictionary).find(english => english.includes('href="proof.zip"'));
  const coded = Object.keys(dictionary).find(english => english.includes('<code>/etc/ssl/cert.pem</code>'));
  const fragments = [linked.replace('proof.zip', 'updated-proof.zip'), coded.replace('/etc/ssl/cert.pem', '/new/cert.pem')];
  const page = render(['ja'], '', { fragments: [linked, coded, ...fragments] });
  assert.equal(page.blocks[0].innerHTML, dictionary[linked]);
  assert.equal(page.blocks[1].innerHTML, dictionary[coded]);
  assert.deepEqual(page.blocks.slice(2).map(block => block.innerHTML), fragments);
  assert.ok(page.blocks.slice(2).every(block => block.lang === 'en'));
});

test('changed checker templates fall back to English and still substitute current values', () => {
  const page = render(['ja']);
  const message = 'Your browser trusted {n} of {total} compromised certificate chains.';
  const updated = 'Your browser accepted {n} of {total} certificate chains.';
  const translate = english => vm.runInContext(`t(${JSON.stringify(english)})`, page.context);
  assert.equal(translate(message).replace('{n}', 1).replace('{total}', 14),
    '接続テスト14件のうち，1件で侵害された中間CAを使った接続に成功しました。この検査では，証明書を拒否して接続しないことが期待されます。ただし，通信エラーでも接続できないため，この結果だけで安全とは断定できません。確認できるのはこのブラウザの状態だけです。Go製アプリなど，別のソフトウェアは個別に確認してください。');
  assert.equal(translate(updated).replace('{n}', 2).replace('{total}', 16),
    'Your browser accepted 2 of 16 certificate chains.');
  for (const english of ['constructor', 'toString', '__proto__', 'New message']) {
    assert.equal(translate(english), english);
  }
});

test('checker distinguishes reported offline failures without hiding a successful connection', async () => {
  const probeSource = html.match(/async function probe\(host\) \{[\s\S]*?\n\}/)[0];
  const expectedBody = vm.runInNewContext(html.match(/const EXPECTED_BODY = ([^\n]+);/)[1]);
  const goodResponse = { status: 200, text: async () => expectedBody };
  const unexpectedResponse = { status: 502, text: async () => 'proxy block page' };
  const timeout = Object.assign(new Error('timeout'), { name: 'AbortError' });
  const networkError = new TypeError('Failed to fetch');
  for (const language of ['en', 'ja']) {
    for (const [online, response, error, status, symbol] of [
      [true, goodResponse, null, 'connected', '❌'],
      [true, unexpectedResponse, null, 'unknown', '⚠️'],
      [true, null, timeout, 'unknown', '⚠️'],
      [true, null, networkError, 'blocked', '✅'],
      [false, null, networkError, 'unknown', '⚠️'],
      [false, goodResponse, null, 'connected', '❌'],
    ]) {
      const page = render([language]);
      page.context.navigator.onLine = online;
      Object.assign(page.context, {
        AbortController, setTimeout: () => 0, clearTimeout: () => {},
        TIMEOUT_MS: 10000, EXPECTED_BODY: expectedBody,
        fetch: async () => { if (error) throw error; return response; },
      });
      vm.runInContext(probeSource, page.context);
      const result = await vm.runInContext('probe("test.example")', page.context);
      assert.equal(result.status, status);
      assert.ok(result.text.startsWith(symbol), result.text);
      if (!online && error) assert.match(result.text, /offline|オフライン/);
      if (response === unexpectedResponse) assert.ok(result.text.includes('502'));
    }
  }
});

test('language links preserve query parameters and follow the current section', () => {
  const page = render(['ja'], '?ref=review&lang=ja');
  assert.equal(page.links[0].href, 'https://example.com/?ref=review&lang=en#check');
  page.location.hash = '#windows';
  page.listeners.hashchange();
  assert.equal(page.links[1].href, 'https://example.com/?ref=review&lang=ja#windows');
});

test('all translation pairs preserve status symbols, links, inline code, and placeholders, including stale entries', () => {
  const values = (text, pattern) => [...text.matchAll(pattern)].map(match => match[1]).sort();
  // Unused translations are allowed: upstream English updates must not require a translation update.
  for (const [english, translation] of Object.entries(dictionary)) {
    for (const symbol of ['✅', '❌', '⚠️']) {
      if (english.startsWith(symbol)) assert.ok(translation.startsWith(symbol), english);
    }
    for (const pattern of [/href="([^"]*)"/g, /<code>([\s\S]*?)<\/code>/g, /(\{\w+\})/g]) {
      assert.deepEqual(values(translation, pattern), values(english, pattern), english);
    }
  }
});
