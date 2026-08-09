import type { Episode } from '../domain/Episode';
import type { PodcastDetail } from '../domain/PodcastRepository';

export class GetEpisode {
  execute(detail: PodcastDetail, episodeId: string): Episode | undefined {
    return detail.episodes.find((e) => e.id === episodeId);
  }
}
