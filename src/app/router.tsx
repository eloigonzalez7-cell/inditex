import { createBrowserRouter } from 'react-router-dom';
import {
  AppLayout,
  EpisodePageLazy,
  HomePageLazy,
  PodcastDetailPageLazy,
} from './AppLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePageLazy /> },
      { path: 'podcast/:podcastId', element: <PodcastDetailPageLazy /> },
      { path: 'podcast/:podcastId/episode/:episodeId', element: <EpisodePageLazy /> },
    ],
  },
]);
