import { Link } from 'react-router-dom';
import type { Podcast } from '../domain/Podcast';
import styles from './PodcastSidebar.module.css';

type PodcastSidebarProps = {
  podcast: Podcast;
  linkToPodcast?: boolean;
};

export function PodcastSidebar({ podcast, linkToPodcast = false }: PodcastSidebarProps) {
  const title = linkToPodcast ? (
    <Link to={`/podcast/${podcast.id}`}>{podcast.title}</Link>
  ) : (
    podcast.title
  );
  const author = linkToPodcast ? (
    <Link to={`/podcast/${podcast.id}`}>{podcast.author}</Link>
  ) : (
    podcast.author
  );
  const image = linkToPodcast ? (
    <Link to={`/podcast/${podcast.id}`}>
      <img src={podcast.imageUrl} alt={podcast.title} />
    </Link>
  ) : (
    <img src={podcast.imageUrl} alt={podcast.title} />
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.imageWrap}>{image}</div>
      <div className={styles.meta}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.author}>by {author}</p>
      </div>
      <div className={styles.descriptionBlock}>
        <h3>Description:</h3>
        <p className={styles.description}>
          {podcast.description.trim() || 'No description available.'}
        </p>
      </div>
    </aside>
  );
}
