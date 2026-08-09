import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { NavigationBusyProvider } from './NavigationBusy';
import { Skeleton } from '@/shared/ui/Skeleton';

export const HomePageLazy = lazy(() =>
  import('@/features/podcasts/ui/HomePage').then((m) => ({ default: m.HomePage })),
);
export const PodcastDetailPageLazy = lazy(() =>
  import('@/features/podcasts/ui/PodcastDetailPage').then((m) => ({
    default: m.PodcastDetailPage,
  })),
);
export const EpisodePageLazy = lazy(() =>
  import('@/features/podcasts/ui/EpisodePage').then((m) => ({ default: m.EpisodePage })),
);

export function AppLayout() {
  return (
    <NavigationBusyProvider>
      <Header />
      <main>
        <Suspense fallback={<Skeleton height="240px" width="100%" />}>
          <Outlet />
        </Suspense>
      </main>
    </NavigationBusyProvider>
  );
}
