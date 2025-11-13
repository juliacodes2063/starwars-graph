import { useSearchParams } from 'react-router-dom';
import { useHeroes } from '../../entities/hero/model/useHeroes';
import { useHeroImageMap } from '../../entities/hero/model/useHeroImageMap';

import { Loader } from '../../shared/components/Loader';
import { PageTransition } from '../../shared/components/PageTransition';
import { HeroList } from '../../entities/hero/ui/HeroList';
import { Pagination } from '../../shared/components/Pagination/Pagination';

import styles from './HeroesPage.module.scss';

// List page for Star Wars heroes with pagination and image integration
export function HeroesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const page = Number(pageParam) > 0 ? Number(pageParam) : 1;

  const { data, isLoading, isError } = useHeroes(page);
  const imagesQ = useHeroImageMap();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <p>Failed to load heroes</p>;
  }

  const handlePrev = () => {
    const nextPage = Math.max(1, page - 1);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(nextPage));

      return params;
    });
  };

  const handleNext = () => {
    const nextPage = page + 1;

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(nextPage));

      return params;
    });
  };

  return (
    <div className={styles.root}>
      <PageTransition>
        <HeroList heroes={data.results} imageMap={imagesQ.data ?? {}} />
      </PageTransition>

      <Pagination
        page={page}
        hasPrev={page > 1}
        hasNext={Boolean(data.next)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
