export interface CacheEntry<T> {
  savedAt: number;
  payload: T;
}

export interface CacheStore {
  get<T>(key: string): CacheEntry<T> | null;
  set<T>(key: string, payload: T): void;
  remove(key: string): void;
}
