export type ApiPerson = {
  id: number;
  name: string;
  films: number[];
  starships: number[];
  url: string;
};

export type ApiPeopleResponse = {
  results: ApiPerson[];
  next: string | null;
  previous?: string | null;
  count?: number;
};

export type ApiFilm = {
  id: number;
  title: string;
  starships: number[];
  url: string;
};

export type ApiStarship = {
  id: number;
  name: string;
  url: string;
};
