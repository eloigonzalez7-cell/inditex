import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { fetchJson } from './fetchJson';

describe('fetchJson', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('uses allorigins get payload contents', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ contents: JSON.stringify({ hello: 'world' }) }),
    } as Response);

    const result = await fetchJson<{ hello: string }>('https://itunes.apple.com/test');
    expect(result).toEqual({ hello: 'world' });
    expect(String(fetchMock.mock.calls[0][0])).toContain('api.allorigins.win/get');
  });

  it('falls back to the next strategy when one fails', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ fallback: true }),
      } as Response);

    const result = await fetchJson<{ fallback: boolean }>('https://itunes.apple.com/test');
    expect(result).toEqual({ fallback: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
