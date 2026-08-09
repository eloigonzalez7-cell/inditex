const ALL_ORIGINS_PREFIX = 'https://api.allorigins.win/raw?url=';

export async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const proxied = `${ALL_ORIGINS_PREFIX}${encodeURIComponent(url)}`;
  const response = await fetch(proxied, { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return (await response.json()) as T;
}
