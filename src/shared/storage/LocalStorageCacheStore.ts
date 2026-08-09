import type { CacheEntry, CacheStore } from '../../features/podcasts/domain/CacheStore';

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;
const SCHEMA_VERSION = 'v1';

export class LocalStorageCacheStore implements CacheStore {
  constructor(
    private readonly storage: Storage = localStorage,
    private readonly now: () => number = () => Date.now(),
    private readonly ttlMs: number = DEFAULT_TTL_MS,
    private readonly version: string = SCHEMA_VERSION,
  ) {}

  private namespaced(key: string): string {
    return `podcaster:${this.version}:${key}`;
  }

  get<T>(key: string): CacheEntry<T> | null {
    try {
      const raw = this.storage.getItem(this.namespaced(key));
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as CacheEntry<T>;
      if (!parsed || typeof parsed.savedAt !== 'number') {
        return null;
      }
      if (this.now() - parsed.savedAt > this.ttlMs) {
        this.remove(key);
        return null;
      }
      return parsed;
    } catch (error) {
      console.error('Cache read failed', error);
      return null;
    }
  }

  set<T>(key: string, payload: T): void {
    try {
      const entry: CacheEntry<T> = { savedAt: this.now(), payload };
      this.storage.setItem(this.namespaced(key), JSON.stringify(entry));
    } catch (error) {
      console.error('Cache write failed', error);
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(this.namespaced(key));
    } catch (error) {
      console.error('Cache remove failed', error);
    }
  }
}
