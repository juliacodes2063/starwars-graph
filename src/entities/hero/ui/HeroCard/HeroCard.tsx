import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './HeroCard.module.scss';

export type HeroCardProps = {
  id: string;
  name: string;
  imageUrl?: string;
};

export function HeroCard({ id, name, imageUrl }: HeroCardProps) {
  // Track when the hero image has finished loading
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.99 }}
      className={styles.heroCard}
      data-testid="hero-card"
    >
      {/* Pass imageUrl via query string so the details page can reuse it */}
      <Link to={`/people/${id}?imageUrl=${imageUrl}`} className={styles.link}>
        <div className={styles.imageWrap}>
          {/* Show skeleton placeholder while image is loading or missing */}
          {(!loaded || !imageUrl) && <div className={styles.placeholder} />}

          {imageUrl && (
            <img
              className={styles.image}
              src={imageUrl}
              alt={name}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
            />
          )}
        </div>

        <p className={styles.title}>{name}</p>
      </Link>
    </motion.div>
  );
}
