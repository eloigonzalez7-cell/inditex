import type { PodcastDetail, PodcastRepository } from '../domain/PodcastRepository';

export class GetPodcastDetail {
  constructor(private readonly repository: PodcastRepository) {}

  execute(podcastId: string, signal?: AbortSignal): Promise<PodcastDetail> {
    return this.repository.getPodcastDetail(podcastId, signal);
  }
}
