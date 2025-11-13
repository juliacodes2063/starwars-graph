import { afterEach, describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';

const useHeroesMock = vi.fn((_page: number) => ({
  data: {
    results: [],
    next: null,
  },
  isLoading: false,
  isError: false,
}));

const useHeroImageMapMock = vi.fn(() => ({
  data: {},
  isLoading: false,
  isError: false,
}));

vi.mock('../../entities/hero/model/useHeroes', () => ({
  useHeroes: (page: number) => useHeroesMock(page),
}));

vi.mock('../../entities/hero/model/useHeroImageMap', () => ({
  useHeroImageMap: () => useHeroImageMapMock(),
}));

import { HeroesPage } from './HeroesPage';

afterEach(() => {
  vi.clearAllMocks();
});

function renderWithRouter(initial: string) {
  return render(
    <MemoryRouter initialEntries={[initial]}>
      <Routes>
        <Route path="/heroes" element={<HeroesPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('HeroesPage', () => {
  it('calls useHeroes with page=1 by default', () => {
    renderWithRouter('/heroes');

    expect(useHeroesMock).toHaveBeenCalledTimes(1);
    expect(useHeroesMock).toHaveBeenCalledWith(1);
  });

  it('reads page from URL and passes it to useHeroes', () => {
    renderWithRouter('/heroes?page=2');

    expect(useHeroesMock).toHaveBeenCalledWith(2);
    expect(useHeroesMock.mock.lastCall?.[0]).toBe(2);
  });
});
