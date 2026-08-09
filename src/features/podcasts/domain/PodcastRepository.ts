import type { Episode } from './Episode';
import type { Podcast } from './Podcast';

export interface PodcastDetail {
  podcast: Podcast;
  episodes: Episode[];
}

export interface PodcastRepository {
  getTopPodcasts(signal?: AbortSignal): Promise<Podcast[]>;
  getPodcastDetail(podcastId: string, signal?: AbortSignal): Promise<PodcastDetail>;
}
