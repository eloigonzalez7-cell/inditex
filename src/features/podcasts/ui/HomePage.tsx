import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigationBusy } from '@/app/NavigationBusy';
import { Skeleton } from '@/shared/ui/Skeleton';
import type { Podcast } from '../domain/Podcast';
import { podcastsContainer } from './container';
import styles from './HomePage.module.css';

export function HomePage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { begin, end } = useNavigationBusy();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    begin();
    podcastsContainer.getTopPodcasts
      .execute(controller.signal)
      .then(setPodcasts)
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
  }, [begin, end]);

  const filtered = useMemo(
    () => podcastsContainer.filterPodcasts.execute(podcasts, query),
    [podcasts, query],
  );

  return (
    <section className={styles.page}>
      <div className={styles.toolbar}>
        <span className={styles.badge} data-testid="podcast-count">
          {filtered.length}
        </span>
        <input
          className={styles.filter}
          type="search"
          placeholder="Filter podcasts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter podcasts"
        />
      </div>

      {loading ? (
        <div className={styles.grid} aria-busy>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.card}>
              <Skeleton height="160px" />
              <Skeleton height="16px" width="80%" />
              <Skeleton height="14px" width="50%" />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((podcast) => (
            <Link
              key={podcast.id}
              to={`/podcast/${podcast.id}`}
              className={styles.card}
              data-testid="podcast-card"
            >
              <img src={podcast.imageUrl} alt="" className={styles.cover} />
              <h2 className={styles.title}>{podcast.title}</h2>
              <p className={styles.author}>Author: {podcast.author}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
