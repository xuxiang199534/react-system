const jsdom = require('jsdom');
const { JSDOM } = jsdom;

if (typeof document === 'undefined') {
  let browser = new JSDOM('<!doctype html><html><body></body></html>');
  global.window = browser.window;
  global.document = browser.window.document;
  global.navigator = browser.window.navigator;
}