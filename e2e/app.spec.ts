import { test, expect } from '@playwright/test';

const topFixture = {
  feed: {
    entry: [
      {
        id: { attributes: { 'im:id': '111' } },
        'im:name': { label: 'Alpha Podcast' },
        'im:artist': { label: 'Alice' },
        'im:image': [{ label: 'https://example.com/a.jpg' }],
        summary: { label: 'Alpha description' },
      },
      {
        id: { attributes: { 'im:id': '222' } },
        'im:name': { label: 'Beta Show' },
        'im:artist': { label: 'Bob' },
        'im:image': [{ label: 'https://example.com/b.jpg' }],
        summary: { label: 'Beta description' },
      },
    ],
  },
};

const detailFixture = {
  results: [
    {
      wrapperType: 'track',
      kind: 'podcast',
      collectionId: 111,
      collectionName: 'Alpha Podcast',
      artistName: 'Alice',
      artworkUrl600: 'https://example.com/a.jpg',
      description: 'Alpha description',
    },
    {
      wrapperType: 'podcastEpisode',
      kind: 'podcast-episode',
      trackId: 9001,
      trackName: 'First Episode',
      description: '<p>Episode body</p><script>alert(1)</script>',
      releaseDate: '2024-01-01T00:00:00Z',
      trackTimeMillis: 120000,
      episodeUrl: 'https://example.com/ep.mp3',
    },
  ],
};

async function mockApis(page: import('@playwright/test').Page) {
  const fulfill = async (route: import('@playwright/test').Route) => {
    const url = decodeURIComponent(route.request().url());
    if (url.includes('toppodcasts')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(topFixture),
      });
      return;
    }
    if (url.includes('lookup')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(detailFixture),
      });
      return;
    }
    await route.fallback();
  };

  await page.route('**/api.allorigins.win/**', fulfill);
  await page.route('**/itunes-proxy/**', fulfill);
  await page.route('**/corsproxy.io/**', fulfill);
}

test('home filters podcasts and opens detail', async ({ page }) => {
  await mockApis(page);
  await page.goto('/');
  await expect(page.getByTestId('podcast-card')).toHaveCount(2);
  await page.getByLabel('Filter podcasts').fill('Beta');
  await expect(page.getByTestId('podcast-card')).toHaveCount(1);
  await page.getByLabel('Filter podcasts').fill('');
  await page.getByRole('link', { name: /Alpha Podcast/i }).first().click();
  await expect(page.getByRole('heading', { name: /Episodes:/i })).toBeVisible();
  await page.getByRole('link', { name: 'First Episode' }).click();
  await expect(page.getByRole('heading', { name: 'First Episode' })).toBeVisible();
  await expect(page.locator('audio')).toHaveAttribute('src', 'https://example.com/ep.mp3');
  await expect(page.getByTestId('episode-description')).toContainText('Episode body');
  await expect(page.getByTestId('episode-description').locator('script')).toHaveCount(0);
});
