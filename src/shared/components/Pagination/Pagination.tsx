import styles from './Pagination.module.scss';

type PaginationProps = {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({ page, hasPrev, hasNext, onPrev, onNext }: PaginationProps) {
  return (
    <div className={styles.root}>
      <button type="button" className={styles.button} onClick={onPrev} disabled={!hasPrev}>
        Prev
      </button>

      <span className={styles.pageNumber}>{page}</span>

      <button type="button" className={styles.button} onClick={onNext} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
}
