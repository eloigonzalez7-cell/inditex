import { describe, expect, it } from 'vitest';
import { mapTopPodcasts, mapPodcastDetail } from './itunesMappers';

describe('itunesMappers', () => {
  it('maps top podcast feed entries', () => {
    const podcasts = mapTopPodcasts({
      feed: {
        entry: [
          {
            id: { attributes: { 'im:id': '42' } },
            'im:name': { label: 'Demo Show' },
            'im:artist': { label: 'Demo Author' },
            'im:image': [{ label: 'small.jpg' }, { label: 'large.jpg' }],
            summary: { label: 'Hello' },
          },
        ],
      },
    });
    expect(podcasts).toHaveLength(1);
    expect(podcasts[0].id).toBe('42');
    expect(podcasts[0].imageUrl).toBe('large.jpg');
  });

  it('maps lookup payload into podcast and episodes', () => {
    const detail = mapPodcastDetail(
      {
        results: [
          {
            wrapperType: 'track',
            kind: 'podcast',
            collectionId: 99,
            collectionName: 'Demo Show',
            artistName: 'Demo Author',
            artworkUrl600: 'cover.jpg',
            description: 'About',
          },
          {
            wrapperType: 'podcastEpisode',
            kind: 'podcast-episode',
            trackId: 7,
            trackName: 'Episode One',
            description: '<p>Hi</p>',
            releaseDate: '2024-01-02T00:00:00Z',
            trackTimeMillis: 65000,
            episodeUrl: 'https://example.com/a.mp3',
          },
        ],
      },
      '99',
    );
    expect(detail.podcast.title).toBe('Demo Show');
    expect(detail.episodes).toHaveLength(1);
    expect(detail.episodes[0].durationMs).toBe(65000);
  });
});
