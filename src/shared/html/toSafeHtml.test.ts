import { describe, expect, it } from 'vitest';
import { decodeHtmlEntities, toSafeHtml } from './toSafeHtml';

describe('toSafeHtml', () => {
  it('interprets real HTML instead of escaping tags', () => {
    const html = toSafeHtml('<p>Hello <strong>world</strong></p>');
    expect(html).toContain('<p>Hello <strong>world</strong></p>');
    expect(html).not.toContain('&lt;p&gt;');
  });

  it('decodes entity-encoded HTML before rendering', () => {
    const html = toSafeHtml('&lt;p&gt;Encoded &lt;a href=&quot;https://x.com&quot;&gt;link&lt;/a&gt;&lt;/p&gt;');
    expect(html).toContain('<p>Encoded <a href="https://x.com">link</a></p>');
    expect(html).not.toContain('&lt;p&gt;');
  });

  it('formats plain text into paragraphs and anchors', () => {
    const html = toSafeHtml('Listen at https://www.drinkchamps.com for more');
    expect(html).toContain('<p>');
    expect(html).toContain('href="https://www.drinkchamps.com"');
    expect(html).not.toContain('&lt;a');
  });

  it('keeps existing html tags and linkifies bare urls in text', () => {
    const html = toSafeHtml('<p>See https://example.com/x</p>');
    expect(html).toContain('<p>See ');
    expect(html).toContain('href="https://example.com/x"');
  });
});

describe('decodeHtmlEntities', () => {
  it('decodes common entities', () => {
    expect(decodeHtmlEntities('&lt;br/&gt; a &amp; b')).toBe('<br/> a & b');
  });
});
