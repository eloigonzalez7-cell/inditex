const URL_PATTERN =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/g;

export function toSafeHtml(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return '';
  }

  const looksLikeHtml = /<\/?(p|div|br|a|ul|ol|li|span|em|strong|b|i|h[1-6])[\s>/]/i.test(
    trimmed,
  );

  if (looksLikeHtml) {
    return linkifyHtmlText(trimmed);
  }

  return trimmed
    .replace(/\r\n/g, '\n')
    .split(/\n+/)
    .map((line) => `<p>${linkifyEscapedText(escapeText(line))}</p>`)
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

/** Linkify bare URLs that appear as text inside otherwise-HTML content. */
function linkifyHtmlText(html: string): string {
  return html.replace(/(^|>)([^<]+)(?=<|$)/g, (_full, prefix: string, text: string) => {
    return `${prefix}${linkifyEscapedText(text)}`;
  });
}

function trimTrailingPunctuation(url: string): string {
  return url.replace(/[.,);!?]+$/g, '');
}
