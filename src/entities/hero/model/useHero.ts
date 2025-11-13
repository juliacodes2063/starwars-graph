import { useQuery } from '@tanstack/react-query';
import { getPerson } from '../../../api/starwars';

// Loads single hero; disabled until id is present
export function useHero(id: string | undefined) {
  return useQuery({
    queryKey: ['hero', id],
    queryFn: () => getPerson(id!),
    enabled: !!id,
  });
}
