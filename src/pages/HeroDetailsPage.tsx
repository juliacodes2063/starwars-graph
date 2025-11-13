import { useParams, useSearchParams } from 'react-router-dom';
import { useHeroGraph } from '../features/hero-graph/model/useHeroGraph';
import { Loader } from '../shared/components/Loader';
import { PageTransition } from '../shared/components/PageTransition';
import { HeroGraph } from '../features/hero-graph/ui/HeroGraph';

// Hero details page: loads hero + related graph data and renders React Flow graph
export function HeroDetailsPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { hero, films, starships, isLoading, isError } = useHeroGraph(id);

  const imageUrl = searchParams.get('imageUrl') || '';

  if (isLoading) {
    return <Loader />;
  }
  if (isError || !hero) {
    return <p>Failed to load hero data</p>;
  }

  return (
    <PageTransition>
      <HeroGraph person={hero} films={films} starships={starships} imageUrl={imageUrl} />
    </PageTransition>
  );
}
