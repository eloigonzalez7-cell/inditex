import { Link } from 'react-router-dom';
import { useNavigationBusy } from './NavigationBusy';
import styles from './Header.module.css';

export function Header() {
  const { isBusy } = useNavigationBusy();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          Podcaster
        </Link>
        {isBusy ? (
          <div className={styles.loader} data-testid="nav-loader" aria-label="Loading" />
        ) : null}
      </div>
    </header>
  );
}
