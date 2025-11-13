import { describe, it, expect } from 'vitest';
import { buildGraph } from './buildGraph';

const hero = {
  id: 1,
  name: 'Luke',
  films: [1],
  starships: [10],
  url: '',
};

const films = [
  {
    id: 1,
    title: 'A New Hope',
    starships: [10, 11],
    url: '',
  },
];

const starships = [
  { id: 10, name: 'X-Wing', url: '' },
  { id: 11, name: 'Y-Wing', url: '' },
];

describe('buildGraph', () => {
  it('creates hero, film and only hero starship nodes + edges', () => {
    const { nodes, edges } = buildGraph(hero, films, starships, null);

    const nodeIds = nodes.map((n) => n.id);

    expect(nodeIds).toContain('hero-1');
    expect(nodeIds).toContain('film-1');

    expect(nodeIds).toContain('starship-10');
    expect(nodeIds).not.toContain('starship-11');

    expect(edges.some((e) => e.source === 'hero-1' && e.target === 'film-1')).toBe(true);

    expect(edges.some((e) => e.source === 'film-1' && e.target === 'starship-10')).toBe(true);

    expect(edges.some((e) => e.source === 'film-1' && e.target === 'starship-11')).toBe(false);
  });

  it('uses hero imageUrl when provided', () => {
    const { nodes } = buildGraph(hero, films, starships, 'https://example.com/luke.png');

    const heroNode = nodes.find((n) => n.id === 'hero-1');
    expect(heroNode?.data.imageUrl).toBe('https://example.com/luke.png');
  });

  it('positions film nodes differently for desktop and mobile layouts', () => {
    const { nodes: desktopNodes } = buildGraph(hero, films, starships, null, 'desktop');
    const { nodes: mobileNodes } = buildGraph(hero, films, starships, null, 'mobile');

    const desktopFilm = desktopNodes.find((n) => n.id === 'film-1');
    const mobileFilm = mobileNodes.find((n) => n.id === 'film-1');

    expect(desktopFilm).toBeDefined();
    expect(mobileFilm).toBeDefined();

    expect(desktopFilm!.position.x).toBe(300);
    expect(desktopFilm!.position.y).toBe(0);

    expect(mobileFilm!.position.x).toBe(0);
    expect(mobileFilm!.position.y).toBe(200);
  });
});
