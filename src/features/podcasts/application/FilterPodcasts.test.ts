import { describe, expect, it } from 'vitest';
import { Podcast } from '../domain/Podcast';
import { FilterPodcasts } from './FilterPodcasts';

describe('FilterPodcasts', () => {
  const useCase = new FilterPodcasts();
  const podcasts = [
    new Podcast('1', 'Syntax', 'Wes Bos', ''),
    new Podcast('2', 'JS Party', 'Changelog', ''),
    new Podcast('3', 'ShopTalk', 'Chris Coyier', ''),
  ];

  it('returns all podcasts when query is empty', () => {
    expect(useCase.execute(podcasts, '   ')).toHaveLength(3);
  });

  it('filters by title case-insensitively', () => {
    expect(useCase.execute(podcasts, 'syntax')).toEqual([podcasts[0]]);
  });

  it('filters by author', () => {
    expect(useCase.execute(podcasts, 'changelog')).toEqual([podcasts[1]]);
  });
});
