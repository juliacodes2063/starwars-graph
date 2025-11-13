const BASE_URL = 'https://sw-api.starnavi.io';

// Basic GET wrapper to keep API calls in one place
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);

  if (!res.ok) {
    // centralize error
    throw new Error(`API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
