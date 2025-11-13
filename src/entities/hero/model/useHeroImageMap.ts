import { useQuery } from '@tanstack/react-query';
import { fetchAkababImageMap } from '../../../integrations/akabab/client';

// Fetches and caches a static heroId → imageUrl map from Akabab
// We treat it as immutable data and keep it in React Query cache for the whole app lifetime.

export function useHeroImageMap() {
  return useQuery({
    queryKey: ['akabab', 'imageMap'],
    queryFn: fetchAkababImageMap,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });
}
