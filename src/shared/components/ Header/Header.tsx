import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

// App header with optional "back" button and theme toggle
export function Header() {
  const navigate = useNavigate();

  const canGoBack = typeof window !== 'undefined' && window.history.length > 1;

  const handleBack = () => {
    if (!canGoBack) {
      return;
    }
    void navigate(-1);
  };

  return (
    <header className={styles.appHeader}>
      {canGoBack && (
        <button
          type="button"
          onClick={handleBack}
          className={styles.backButton}
          aria-label="Go back"
        >
          ❮
        </button>
      )}

      <h1 className={styles.title}>Star Wars Heroes</h1>

      <ThemeToggle />
    </header>
  );
}
