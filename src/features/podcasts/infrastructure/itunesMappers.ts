import { Episode } from '../domain/Episode';
import { Podcast } from '../domain/Podcast';

interface ItunesTopEntry {
  id: { attributes: { 'im:id': string } };
  'im:name': { label: string };
  'im:artist': { label: string };
  'im:image': Array<{ label: string }>;
  summary?: { label: string };
}

interface ItunesTopFeed {
  feed: { entry: ItunesTopEntry[] | ItunesTopEntry };
}

interface ItunesLookupResult {
  results: Array<Record<string, unknown>>;
}

function asEntries(entry: ItunesTopEntry[] | ItunesTopEntry): ItunesTopEntry[] {
  return Array.isArray(entry) ? entry : [entry];
}

export function mapTopPodcasts(payload: ItunesTopFeed): Podcast[] {
  return asEntries(payload.feed.entry).map((item) => {
    const images = item['im:image'] ?? [];
    const imageUrl = images[images.length - 1]?.label ?? '';
    return new Podcast(
      item.id.attributes['im:id'],
      item['im:name'].label,
      item['im:artist'].label,
      imageUrl,
      item.summary?.label ?? '',
    );
  });
}

function parseDurationMs(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value !== 'string' || !value.trim()) {
    return 0;
  }
  if (/^\d+$/.test(value)) {
    return Number(value);
  }
  const parts = value.split(':').map(Number);
  if (parts.some((p) => Number.isNaN(p))) {
    return 0;
  }
  if (parts.length === 3) {
    return (parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000;
  }
  if (parts.length === 2) {
    return (parts[0] * 60 + parts[1]) * 1000;
  }
  return 0;
}

export function mapPodcastDetail(payload: ItunesLookupResult, podcastId: string) {
  const results = payload.results ?? [];
  const collection = results.find((r) => r.wrapperType === 'track' || r.kind === 'podcast') ??
    results[0];

  if (!collection) {
    throw new Error(`Podcast ${podcastId} not found`);
  }

  const podcast = new Podcast(
    String(collection.collectionId ?? collection.trackId ?? podcastId),
    String(collection.collectionName ?? collection.trackName ?? 'Unknown'),
    String(collection.artistName ?? 'Unknown'),
    String(collection.artworkUrl600 ?? collection.artworkUrl100 ?? ''),
    String(collection.description ?? ''),
  );

  const episodes = results
    .filter((r) => r.wrapperType === 'podcastEpisode' || r.kind === 'podcast-episode')
    .map((r) => {
      const id = String(r.trackId ?? r.episodeGuid ?? '');
      const descriptionHtml = String(
        r.description ?? r.shortDescription ?? r.closedCaptioning ?? '',
      );
      return new Episode(
        id || String(r.episodeGuid ?? Math.random()),
        podcast.id,
        String(r.trackName ?? r.collectionName ?? 'Untitled episode'),
        descriptionHtml,
        new Date(String(r.releaseDate ?? Date.now())),
        parseDurationMs(r.trackTimeMillis ?? r.duration),
        String(r.episodeUrl ?? r.previewUrl ?? ''),
      );
    });

  return { podcast, episodes };
}

export type { ItunesTopFeed, ItunesLookupResult };
