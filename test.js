import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

test('all resume content switches between RU and EN, including with blocked storage', () => {
  const html = readFileSync(new URL('index.html', import.meta.url), 'utf8');
  const script = readFileSync(new URL('script.js', import.meta.url), 'utf8');
  const elements = [...html.matchAll(/data-i18n="([^"]+)"[^>]*>([\s\S]*?)<\//g)].map(match => ({
    dataset: { i18n: match[1] }, innerText: match[2].replace(/<br[^>]*>/g, '\n'), textContent: match[2]
  }));
  const buttons = ['ru', 'en'].map(language => ({
    dataset: { language }, attributes: {},
    setAttribute(key, value) { this.attributes[key] = value; }, addEventListener() {}
  }));
  const description = {};
  const document = {
    documentElement: {},
    querySelectorAll: selector => selector === '[data-i18n]' ? elements : buttons,
    querySelector: selector => selector.startsWith('meta') ? description : { addEventListener() {} }
  };
  const context = { document, window: {}, localStorage: { getItem: () => null, setItem() {} } };
  runInNewContext(script, context);
  context.setLanguage('en');
  assert.equal(document.documentElement.lang, 'en');
  assert.equal(document.title, 'Roman Savenkov — Frontend Developer');
  assert.equal(buttons[1].attributes['aria-pressed'], 'true');
  elements.forEach(element => assert.ok(element.textContent, `Missing English translation: ${element.dataset.i18n}`));
  assert.equal(elements.find(element => element.dataset.i18n === 'firstName').textContent, 'Roman');
  assert.match(elements.find(element => element.dataset.i18n === 'heroDescription').textContent, /\n/);
  context.localStorage.setItem = () => { throw new Error('Storage blocked'); };
  assert.doesNotThrow(() => context.setLanguage('ru'));
  elements.forEach(element => assert.equal(element.textContent, element.innerText));
  context.setLanguage('invalid');
  assert.equal(document.documentElement.lang, 'ru');
  assert.equal(buttons[0].attributes['aria-pressed'], 'true');
  assert.match(description.content, /Роман Савенков/);
  context.localStorage.getItem = () => 'en';
  runInNewContext(script, { ...context });
  assert.equal(document.documentElement.lang, 'en');
  context.localStorage.getItem = () => { throw new Error('Storage blocked'); };
  assert.doesNotThrow(() => runInNewContext(script, { ...context }));
});
