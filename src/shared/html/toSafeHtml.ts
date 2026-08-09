export function toSafeHtml(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return '';
  }
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(trimmed);
  if (looksLikeHtml) {
    return trimmed;
  }
  return trimmed
    .split(/\n+/)
    .map((line) => `<p>${escapeText(line)}</p>`)
    .join('');
}

function escapeText(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
