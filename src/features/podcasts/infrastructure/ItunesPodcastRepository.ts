import type { PodcastRepository } from '../domain/PodcastRepository';
import { fetchJson } from '@/shared/http/fetchJson';
import {
  mapPodcastDetail,
  mapTopPodcasts,
  type ItunesLookupResult,
  type ItunesTopFeed,
} from './itunesMappers';

const TOP_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export class ItunesPodcastRepository implements PodcastRepository {
  async getTopPodcasts(signal?: AbortSignal) {
    const data = await fetchJson<ItunesTopFeed>(TOP_URL, signal);
    return mapTopPodcasts(data);
  }

  async getPodcastDetail(podcastId: string, signal?: AbortSignal) {
    const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(podcastId)}&media=podcast&entity=podcastEpisode&limit=20`;
    const data = await fetchJson<ItunesLookupResult>(url, signal);
    return mapPodcastDetail(data, podcastId);
  }
}
