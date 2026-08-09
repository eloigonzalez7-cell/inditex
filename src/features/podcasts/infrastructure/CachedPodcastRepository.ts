import { Episode } from '../domain/Episode';
import { Podcast } from '../domain/Podcast';
import type { CacheStore } from '../domain/CacheStore';
import type { PodcastDetail, PodcastRepository } from '../domain/PodcastRepository';

const TOP_KEY = 'top-podcasts';
const detailKey = (id: string) => `podcast:${id}`;

type SerializedPodcast = {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  description: string;
};

type SerializedEpisode = {
  id: string;
  podcastId: string;
  title: string;
  descriptionHtml: string;
  releaseDate: string;
  durationMs: number;
  audioUrl: string;
};

type SerializedDetail = {
  podcast: SerializedPodcast;
  episodes: SerializedEpisode[];
};

function serializePodcast(p: Podcast): SerializedPodcast {
  return {
    id: p.id,
    title: p.title,
    author: p.author,
    imageUrl: p.imageUrl,
    description: p.description,
  };
}

function hydratePodcast(p: SerializedPodcast): Podcast {
  return new Podcast(p.id, p.title, p.author, p.imageUrl, p.description);
}

function serializeDetail(detail: PodcastDetail): SerializedDetail {
  return {
    podcast: serializePodcast(detail.podcast),
    episodes: detail.episodes.map((e) => ({
      id: e.id,
      podcastId: e.podcastId,
      title: e.title,
      descriptionHtml: e.descriptionHtml,
      releaseDate: e.releaseDate.toISOString(),
      durationMs: e.durationMs,
      audioUrl: e.audioUrl,
    })),
  };
}

function hydrateDetail(detail: SerializedDetail): PodcastDetail {
  return {
    podcast: hydratePodcast(detail.podcast),
    episodes: detail.episodes.map(
      (e) =>
        new Episode(
          e.id,
          e.podcastId,
          e.title,
          e.descriptionHtml,
          new Date(e.releaseDate),
          e.durationMs,
          e.audioUrl,
        ),
    ),
  };
}

export class CachedPodcastRepository implements PodcastRepository {
  constructor(
    private readonly inner: PodcastRepository,
    private readonly cache: CacheStore,
  ) {}

  async getTopPodcasts(signal?: AbortSignal): Promise<Podcast[]> {
    const hit = this.cache.get<SerializedPodcast[]>(TOP_KEY);
    if (hit) {
      return hit.payload.map(hydratePodcast);
    }
    const podcasts = await this.inner.getTopPodcasts(signal);
    this.cache.set(
      TOP_KEY,
      podcasts.map(serializePodcast),
    );
    return podcasts;
  }

  async getPodcastDetail(podcastId: string, signal?: AbortSignal): Promise<PodcastDetail> {
    const key = detailKey(podcastId);
    const hit = this.cache.get<SerializedDetail>(key);
    if (hit) {
      return hydrateDetail(hit.payload);
    }
    const detail = await this.inner.getPodcastDetail(podcastId, signal);
    this.cache.set(key, serializeDetail(detail));
    return detail;
  }
}
