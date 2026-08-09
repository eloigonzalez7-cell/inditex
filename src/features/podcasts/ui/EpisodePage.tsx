import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import { useNavigationBusy } from '@/app/NavigationBusy';
import { toSafeHtml } from '@/shared/html/toSafeHtml';
import { Skeleton } from '@/shared/ui/Skeleton';
import type { Episode } from '../domain/Episode';
import type { Podcast } from '../domain/Podcast';
import { podcastsContainer } from './container';
import { PodcastSidebar } from './PodcastSidebar';
import styles from './EpisodePage.module.css';

export function EpisodePage() {
  const { podcastId = '', episodeId = '' } = useParams();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const { begin, end } = useNavigationBusy();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setPodcast(null);
    setEpisode(null);
    begin();
    podcastsContainer.getPodcastDetail
      .execute(podcastId, controller.signal)
      .then((detail) => {
        setPodcast(detail.podcast);
        const found = podcastsContainer.getEpisode.execute(detail, episodeId);
        setEpisode(found ?? null);
        if (!found) {
          console.error(new Error(`Episode ${episodeId} not found`));
        }
      })
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
  }, [podcastId, episodeId, begin, end]);

  if (loading || !podcast || !episode) {
    return (
      <div className={styles.layout}>
        <Skeleton height="420px" width="280px" />
        <Skeleton height="280px" />
      </div>
    );
  }

  const safeHtml = DOMPurify.sanitize(toSafeHtml(episode.descriptionHtml));

  return (
    <div className={styles.layout}>
      <PodcastSidebar podcast={podcast} linkToPodcast />
      <section className={styles.main}>
        <h2 className={styles.title}>{episode.title}</h2>
        {safeHtml ? (
          <div
            className={styles.description}
            data-testid="episode-description"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        ) : (
          <p className={styles.description} data-testid="episode-description">
            No description available for this episode.
          </p>
        )}
        <audio className={styles.audio} controls src={episode.audioUrl} preload="none">
          Your browser does not support the audio element.
        </audio>
      </section>
    </div>
  );
}
