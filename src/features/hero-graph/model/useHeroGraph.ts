import { useQuery } from '@tanstack/react-query';
import { useHero } from '../../../entities/hero/model/useHero';
import { getFilm, getStarship } from '../../../api/starwars';

// Loads hero details together with all related films and starships.
// Films/starships are fetched only after the hero is successfully loaded
// and only if there are corresponding ids in the response.
export function useHeroGraph(id: string | undefined) {
  // Base hero query (id may come from route params)
  const heroQuery = useHero(id);
  const hero = heroQuery.data;

  // Fetch all films that the hero appears in
  const filmsQuery = useQuery({
    queryKey: ['hero', id, 'films'],
    // Don't trigger films request until hero is loaded and has film ids
    enabled: !!hero && Array.isArray(hero.films) && hero.films.length > 0,
    queryFn: async () => {
      const filmIds: Array<number | string> = hero!.films ?? [];
      return Promise.all(filmIds.map((filmId) => getFilm(String(filmId))));
    },
  });

  // Fetch all starships that belong to this hero
  const starshipsQuery = useQuery({
    queryKey: ['hero', id, 'starships'],
    // Same idea: wait for hero and starship ids
    enabled: !!hero && Array.isArray(hero.starships) && hero.starships.length > 0,
    queryFn: async () => {
      const starshipIds: Array<number | string> = hero!.starships ?? [];
      return Promise.all(starshipIds.map((shipId) => getStarship(String(shipId))));
    },
  });

  // Aggregate data + combined loading / error flags
  return {
    hero,
    films: filmsQuery.data ?? [],
    starships: starshipsQuery.data ?? [],
    isLoading: heroQuery.isLoading || filmsQuery.isLoading || starshipsQuery.isLoading,
    isError: heroQuery.isError || filmsQuery.isError || starshipsQuery.isError,
  };
}
