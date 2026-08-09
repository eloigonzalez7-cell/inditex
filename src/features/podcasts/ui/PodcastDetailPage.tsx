import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigationBusy } from '@/app/NavigationBusy';
import { formatDuration, formatReleaseDate } from '@/shared/dates/format';
import { Skeleton } from '@/shared/ui/Skeleton';
import type { PodcastDetail } from '../domain/PodcastRepository';
import { podcastsContainer } from './container';
import { PodcastSidebar } from './PodcastSidebar';
import styles from './PodcastDetailPage.module.css';

export function PodcastDetailPage() {
  const { podcastId = '' } = useParams();
  const [detail, setDetail] = useState<PodcastDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { begin, end } = useNavigationBusy();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setDetail(null);
    begin();
    podcastsContainer.getPodcastDetail
      .execute(podcastId, controller.signal)
      .then(setDetail)
      .catch((error: unknown) => {
        if ((error as Error).name === 'AbortError') {
          return;
        }
        console.error(error);
      })
      .finally(() => {
        end();
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [podcastId, begin, end]);

  if (loading || !detail) {
    return (
      <div className={styles.layout}>
        <Skeleton height="420px" width="280px" />
        <div className={styles.main}>
          <Skeleton height="40px" width="200px" />
          <Skeleton height="240px" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <PodcastSidebar podcast={detail.podcast} linkToPodcast />
      <section className={styles.main}>
        <div className={styles.countCard}>
          <h2>Episodes: {detail.episodes.length}</h2>
        </div>
        <div className={styles.tableCard}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {detail.episodes.map((episode) => (
                <tr key={episode.id}>
                  <td>
                    <Link to={`/podcast/${detail.podcast.id}/episode/${episode.id}`}>
                      {episode.title}
                    </Link>
                  </td>
                  <td>{formatReleaseDate(episode.releaseDate)}</td>
                  <td>{formatDuration(episode.durationMs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
