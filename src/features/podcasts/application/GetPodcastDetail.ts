import { Podcast } from '../domain/Podcast';
import type { PodcastDetail, PodcastRepository } from '../domain/PodcastRepository';

export class GetPodcastDetail {
  constructor(private readonly repository: PodcastRepository) {}

  async execute(podcastId: string, signal?: AbortSignal): Promise<PodcastDetail> {
    const detail = await this.repository.getPodcastDetail(podcastId, signal);
    if (detail.podcast.description.trim()) {
      return detail;
    }

    try {
      const top = await this.repository.getTopPodcasts(signal);
      const match = top.find((podcast) => podcast.id === podcastId);
      if (!match?.description.trim()) {
        return detail;
      }
      return {
        podcast: new Podcast(
          detail.podcast.id,
          detail.podcast.title,
          detail.podcast.author,
          detail.podcast.imageUrl,
          match.description,
        ),
        episodes: detail.episodes,
      };
    } catch (error) {
      console.error(error);
      return detail;
    }
  }
}
