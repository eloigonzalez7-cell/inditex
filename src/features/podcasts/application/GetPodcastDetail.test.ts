import { describe, expect, it, vi } from 'vitest';
import { Episode } from '../domain/Episode';
import { Podcast } from '../domain/Podcast';
import type { PodcastRepository } from '../domain/PodcastRepository';
import { GetPodcastDetail } from './GetPodcastDetail';

describe('GetPodcastDetail', () => {
  it('enriches empty podcast description from the top list', async () => {
    const repository: PodcastRepository = {
      getTopPodcasts: vi.fn(async () => [
        new Podcast('99', 'Show', 'Host', 'img.jpg', 'From top feed summary'),
      ]),
      getPodcastDetail: vi.fn(async () => ({
        podcast: new Podcast('99', 'Show', 'Host', 'img.jpg', ''),
        episodes: [
          new Episode('1', '99', 'Ep', '<p>Body</p>', new Date('2024-01-01'), 1000, 'a.mp3'),
        ],
      })),
    };

    const useCase = new GetPodcastDetail(repository);
    const detail = await useCase.execute('99');
    expect(detail.podcast.description).toBe('From top feed summary');
    expect(detail.episodes[0].descriptionHtml).toContain('Body');
  });
});
