// Generic JSON fetch helper.
// - Wraps the native fetch API
// - Throws on non-2xx responses with a descriptive HTTP error
// - Parses the response body as JSON and returns it as typed T
export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);

  // Fail fast on HTTP errors so callers don't have to check res.ok manually
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  // We trust the endpoint to return JSON matching T
  return (await res.json()) as unknown as T;
}
