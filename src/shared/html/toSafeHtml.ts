const URL_PATTERN =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/g;

const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*?>/i;
const ENCODED_TAG_PATTERN = /&lt;\/?[a-z]/i;

/**
 * Prepares episode description HTML for safe rendering with dangerouslySetInnerHTML.
 * HTML from Apple must be interpreted (not shown as escaped tags).
 */
export function toSafeHtml(raw: string): string {
  let content = raw.trim();
  if (!content) {
    return '';
  }

  if (ENCODED_TAG_PATTERN.test(content)) {
    content = decodeHtmlEntities(content);
  }

  if (HTML_TAG_PATTERN.test(content)) {
    return linkifyHtmlText(content);
  }

  return plainTextToHtml(content);
}

export function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function plainTextToHtml(text: string): string {
  const normalized = text
    .replace(/\r\n/g, '\n')
    // Soft-separate stuck URLs like "comFollow:" or "comhttps://"
    .replace(/(https?:\/\/\S+?)(?=https?:\/\/)/g, '$1\n')
    .replace(/([a-z0-9/])(https?:\/\/)/gi, '$1\n$2');

  const paragraphs = normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return '';
  }

  return paragraphs
    .map((block) => {
      const withBreaks = escapeText(block).replace(/\n/g, '<br />');
      return `<p>${linkifyEscapedText(withBreaks)}</p>`;
    })
    .join('');
}

function escapeText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function linkifyEscapedText(escaped: string): string {
  return escaped.replace(URL_PATTERN, (url) => {
    const cleaned = trimTrailingPunctuation(url);
    return `<a href="${cleaned}" target="_blank" rel="noopener noreferrer">${cleaned}</a>`;
  });
}

/** Linkify bare URLs that appear as text nodes inside HTML content. */
function linkifyHtmlText(html: string): string {
  return html.replace(/(^|>)([^<]+)(?=<|$)/g, (_full, prefix: string, text: string) => {
    return `${prefix}${linkifyEscapedText(text)}`;
  });
}

function trimTrailingPunctuation(url: string): string {
  return url.replace(/[.,);!?]+$/g, '');
}
