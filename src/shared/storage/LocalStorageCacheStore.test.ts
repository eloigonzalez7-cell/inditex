import { describe, expect, it, vi } from 'vitest';
import { LocalStorageCacheStore } from '@/shared/storage/LocalStorageCacheStore';

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: (key) => {
      map.delete(key);
    },
    key: (index) => Array.from(map.keys())[index] ?? null,
  };
}

describe('LocalStorageCacheStore', () => {
  it('returns payload within TTL', () => {
    const now = vi.fn(() => 1_000_000);
    const store = new LocalStorageCacheStore(memoryStorage(), now, 24 * 60 * 60 * 1000);
    store.set('top', { ok: true });
    expect(store.get<{ ok: boolean }>('top')?.payload).toEqual({ ok: true });
  });

  it('expires after 24 hours', () => {
    let current = 1_000_000;
    const store = new LocalStorageCacheStore(
      memoryStorage(),
      () => current,
      24 * 60 * 60 * 1000,
    );
    store.set('top', [1, 2, 3]);
    current += 24 * 60 * 60 * 1000 + 1;
    expect(store.get('top')).toBeNull();
  });
});
