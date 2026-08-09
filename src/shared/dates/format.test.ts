import { describe, expect, it } from 'vitest';
import { formatDuration, formatReleaseDate } from './format';

describe('format helpers', () => {
  it('formats durations', () => {
    expect(formatDuration(65_000)).toBe('1:05');
    expect(formatDuration(3_661_000)).toBe('1:01:01');
  });

  it('formats release dates as dd/mm/yyyy', () => {
    expect(formatReleaseDate(new Date(2024, 4, 9))).toBe('09/05/2024');
  });
});
