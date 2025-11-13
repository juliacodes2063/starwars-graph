import type { ApiFilm, ApiPerson, ApiStarship } from '../../../api/starwars.types';

type GraphNodeType = 'hero' | 'film' | 'starship';

type GraphNode = {
  id: string;
  type: GraphNodeType;
  data: {
    label: string;
    imageUrl?: string;
    badge: 'Hero' | 'Film' | 'Ship';
  };
  position: {
    x: number;
    y: number;
  };
  draggable?: boolean;
};

type GraphEdge = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
};

type GraphLayout = 'desktop' | 'mobile';

export function buildGraph(
  hero: ApiPerson,
  films: ApiFilm[],
  starships: ApiStarship[],
  imageUrl: string | null,
  layout: GraphLayout = 'desktop',
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  // hero's starships as a fast lookup
  const heroStarshipIds = new Set(hero.starships.map((id) => String(id)));

  // map of all fetched starships
  const starshipById = new Map<string, ApiStarship>(starships.map((s) => [String(s.id), s]));

  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  const isDesktop = layout === 'desktop';

  const columnGap = isDesktop ? 300 : 220;
  const rowGap = isDesktop ? 150 : 200;

  const heroX = 0;
  const heroY = 0;

  // 1) hero node
  nodes.push({
    id: `hero-${hero.id}`,
    type: 'hero',
    data: {
      label: hero.name,
      imageUrl: imageUrl ?? undefined,
      badge: 'Hero',
    },
    position: { x: heroX, y: heroY },
  });

  // 2) film nodes + edge hero -> film
  films.forEach((film, index) => {
    const filmNodeId = `film-${film.id}`;

    const filmX = isDesktop ? heroX + columnGap : heroX;
    const filmY = isDesktop ? index * rowGap : heroY + (index + 1) * rowGap;

    nodes.push({
      id: filmNodeId,
      type: 'film',
      data: { label: film.title, badge: 'Film' },
      position: { x: filmX, y: filmY },
    });

    edges.push({
      id: `hero-${hero.id}=>film-${film.id}`,
      source: `hero-${hero.id}`,
      target: filmNodeId,
      animated: true,
    });

    // 3) film -> starship edges (only those the hero actually flew)
    film.starships.forEach((shipIdNumber) => {
      const shipId = String(shipIdNumber);

      // keep only hero's own ships
      if (!heroStarshipIds.has(shipId)) {
        return;
      }

      const ship = starshipById.get(shipId);
      if (!ship) {
        return;
      }

      const starshipNodeId = `starship-${shipId}`;

      const shipX = filmX + columnGap;
      const shipY = filmY;

      // add starship node once
      if (!nodes.some((n) => n.id === starshipNodeId)) {
        nodes.push({
          id: starshipNodeId,
          type: 'starship',
          data: { label: ship.name, badge: 'Ship' },
          position: { x: shipX, y: shipY },
        });
      }

      edges.push({
        id: `film-${film.id}=>starship-${shipId}`,
        source: filmNodeId,
        target: starshipNodeId,
        animated: true,
      });
    });
  });

  return { nodes, edges };
}
