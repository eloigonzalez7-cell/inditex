import type { Podcast } from '../domain/Podcast';

export class FilterPodcasts {
  execute(podcasts: Podcast[], query: string): Podcast[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return podcasts;
    }
    return podcasts.filter(
      (p) =>
        p.title.toLowerCase().includes(normalized) ||
        p.author.toLowerCase().includes(normalized),
    );
  }
}
