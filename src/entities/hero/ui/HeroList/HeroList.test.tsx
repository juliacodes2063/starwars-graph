import type { FC } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../HeroCard', () => {
  const HeroCard: FC<{ id: string; name: string; imageUrl?: string }> = (props) => (
    <div data-testid="hero-card" data-image={props.imageUrl}>
      {props.name}
    </div>
  );

  return { __esModule: true, HeroCard };
});

vi.mock('../../../../shared/utils/getIdFromUrl', () => ({
  getIdFromUrl: (url: string) => url.match(/(\d+)/)?.[1] ?? null,
}));

import { HeroList } from './HeroList';

const heroes = [
  {
    id: 1,
    name: 'Luke Skywalker',
    films: [],
    starships: [],
    url: 'https://sw-api.starnavi.io/people/1/',
  },
  {
    id: 2,
    name: 'Leia Organa',
    films: [],
    starships: [],
    url: 'https://sw-api.starnavi.io/people/2/',
  },
];

describe('HeroList', () => {
  it('renders one HeroCard per hero', () => {
    render(<HeroList heroes={heroes} />);

    const cards = screen.getAllByTestId('hero-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('passes imageUrl from imageMap based on hero id', () => {
    const imageMap = {
      '1': 'https://example.com/luke.jpg',
    };

    render(<HeroList heroes={[heroes[0]]} imageMap={imageMap} />);

    const card = screen.getByTestId('hero-card');
    expect(card).toHaveAttribute('data-image', 'https://example.com/luke.jpg');
  });

  it('does not render any cards for empty list', () => {
    render(<HeroList heroes={[]} />);
    expect(screen.queryAllByTestId('hero-card')).toHaveLength(0);
  });
});
