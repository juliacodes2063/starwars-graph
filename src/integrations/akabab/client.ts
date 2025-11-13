import { fetchJson } from '../../shared/utils/fetchJson';
import type { AkababChar, AkababImageMap } from './types';

const AKABAB_ALL_URL = 'https://akabab.github.io/starwars-api/api/all.json';

// Build a heroId → imageUrl map using the Akabab Star Wars API.
// The image source proposed in the test task (starwars-visualguide.com)
// is unstable / not working reliably, so we fetch all characters from Akabab
// once and then resolve images by SWAPI id on the client.
export async function fetchAkababImageMap(): Promise<AkababImageMap> {
  const all = await fetchJson<AkababChar[]>(AKABAB_ALL_URL);

  const map: AkababImageMap = {};
  for (const { id, image } of all) {
    map[String(id)] = image;
  }
  return map;
}
