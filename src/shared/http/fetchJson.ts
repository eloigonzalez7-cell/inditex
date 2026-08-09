type ProxyStrategy = {
  name: string;
  buildUrl: (targetUrl: string) => string;
  parse: (response: Response) => Promise<unknown>;
};

const isDev = process.env.NODE_ENV === 'development';

async function parseJsonResponse(response: Response): Promise<unknown> {
  return response.json();
}

async function parseAllOriginsGet(response: Response): Promise<unknown> {
  const payload = (await response.json()) as { contents?: string };
  if (typeof payload.contents !== 'string') {
    throw new Error('AllOrigins get response missing contents');
  }
  return JSON.parse(payload.contents);
}

function buildStrategies(targetUrl: string): ProxyStrategy[] {
  const strategies: ProxyStrategy[] = [];

  if (isDev) {
    const parsed = new URL(targetUrl);
    strategies.push({
      name: 'webpack-dev-proxy',
      buildUrl: () => `/itunes-proxy${parsed.pathname}${parsed.search}`,
      parse: parseJsonResponse,
    });
  }

  strategies.push(
    {
      name: 'allorigins-get',
      buildUrl: (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
      parse: parseAllOriginsGet,
    },
    {
      name: 'allorigins-raw',
      buildUrl: (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      parse: parseJsonResponse,
    },
    {
      name: 'corsproxy',
      buildUrl: (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
      parse: parseJsonResponse,
    },
  );

  return strategies;
}

export async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const strategies = buildStrategies(url);
  const errors: string[] = [];

  for (const strategy of strategies) {
    try {
      const response = await fetch(strategy.buildUrl(url), {
        signal,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return (await strategy.parse(response)) as T;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        throw error;
      }
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${strategy.name}: ${message}`);
      console.warn(`Proxy strategy failed (${strategy.name})`, error);
    }
  }

  throw new Error(`Failed to fetch ${url}. Tried: ${errors.join(' | ')}`);
}
