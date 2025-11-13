// Extracts numeric id from SW API urls like ".../people/1/"
export function getIdFromUrl(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1] ?? null;
}
