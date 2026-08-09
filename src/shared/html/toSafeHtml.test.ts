import { describe, expect, it } from 'vitest';
import { toSafeHtml } from './toSafeHtml';

describe('toSafeHtml', () => {
  it('escapes plain text and wraps paragraphs', () => {
    expect(toSafeHtml('Hello <world>')).toBe('<p>Hello &lt;world&gt;</p>');
  });

  it('turns bare urls into anchors', () => {
    const html = toSafeHtml('Listen at https://www.drinkchamps.com for more');
    expect(html).toContain(
      '<a href="https://www.drinkchamps.com" target="_blank" rel="noopener noreferrer">https://www.drinkchamps.com</a>',
    );
  });

  it('keeps existing html tags and linkifies bare urls in text', () => {
    const html = toSafeHtml('<p>See https://example.com/x</p>');
    expect(html).toContain('<p>See ');
    expect(html).toContain('href="https://example.com/x"');
  });
});
