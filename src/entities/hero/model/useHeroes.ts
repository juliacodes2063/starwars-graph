import { useQuery } from '@tanstack/react-query';
import { getPeople } from '../../../api/starwars';

// Loads paginated people list
export function useHeroes(page: number) {
  return useQuery({
    queryKey: ['heroes', page],
    queryFn: () => getPeople(page),
  });
}
