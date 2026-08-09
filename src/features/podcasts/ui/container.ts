import { CachedPodcastRepository } from '../infrastructure/CachedPodcastRepository';
import { ItunesPodcastRepository } from '../infrastructure/ItunesPodcastRepository';
import { LocalStorageCacheStore } from '@/shared/storage/LocalStorageCacheStore';
import { FilterPodcasts } from '../application/FilterPodcasts';
import { GetEpisode } from '../application/GetEpisode';
import { GetPodcastDetail } from '../application/GetPodcastDetail';
import { GetTopPodcasts } from '../application/GetTopPodcasts';

const cache = new LocalStorageCacheStore();
const repository = new CachedPodcastRepository(new ItunesPodcastRepository(), cache);

export const podcastsContainer = {
  getTopPodcasts: new GetTopPodcasts(repository),
  filterPodcasts: new FilterPodcasts(),
  getPodcastDetail: new GetPodcastDetail(repository),
  getEpisode: new GetEpisode(),
};
