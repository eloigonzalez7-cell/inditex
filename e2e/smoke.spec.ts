import { test, expect } from '@playwright/test';

test('smoke: home renders shell', async ({ page }) => {
  await page.route('**/api.allorigins.win/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        feed: {
          entry: [
            {
              id: { attributes: { 'im:id': '1' } },
              'im:name': { label: 'Smoke Podcast' },
              'im:artist': { label: 'Tester' },
              'im:image': [{ label: 'https://example.com/s.jpg' }],
            },
          ],
        },
      }),
    });
  });

  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Podcaster' })).toBeVisible();
  await expect(page.getByTestId('podcast-card')).toHaveCount(1);
});
