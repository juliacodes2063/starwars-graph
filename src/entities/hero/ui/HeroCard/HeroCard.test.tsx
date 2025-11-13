import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { HeroCard } from './HeroCard';
import type { ComponentProps } from 'react';

type DivProps = ComponentProps<'div'>;

vi.mock('framer-motion', () => ({
  __esModule: true,
  motion: {
    div: (props: DivProps) => <div {...props} />,
  },
}));

describe('HeroCard', () => {
  it('renders hero name and correct link', () => {
    render(
      <MemoryRouter>
        <HeroCard id="1" name="Luke Skywalker" imageUrl="https://example.com/luke.jpg" />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /luke skywalker/i });
    expect(link).toHaveAttribute('href', '/people/1?imageUrl=https://example.com/luke.jpg');
  });

  it('renders placeholder and no image when imageUrl is missing', () => {
    const { container } = render(
      <MemoryRouter>
        <HeroCard id="1" name="Luke Skywalker" />
      </MemoryRouter>,
    );

    // img отсутствует
    expect(container.querySelector('img')).toBeNull();

    // placeholder есть (если хочешь — можешь добавить data-testid на placeholder,
    // но тут пример через className)
    expect(container.querySelector('[class*="placeholder"]')).not.toBeNull();
  });

  it('renders image when imageUrl is provided', () => {
    const { container } = render(
      <MemoryRouter>
        <HeroCard id="1" name="Luke Skywalker" imageUrl="https://example.com/luke.jpg" />
      </MemoryRouter>,
    );

    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute('src', 'https://example.com/luke.jpg');
    expect(img).toHaveAttribute('alt', 'Luke Skywalker');
  });
});
