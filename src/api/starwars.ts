import { apiGet } from './client';
import type { ApiFilm, ApiPeopleResponse, ApiPerson, ApiStarship } from './starwars.types';

// List of people with pagination
export function getPeople(page = 1) {
  return apiGet<ApiPeopleResponse>(`/people/?page=${page}`);
}

// Single person by id
export function getPerson(id: string) {
  return apiGet<ApiPerson>(`/people/${id}/`);
}

// Endpoints for person's properties
export function getFilm(id: string) {
  return apiGet<ApiFilm>(`/films/${id}/`);
}

export function getStarship(id: string) {
  return apiGet<ApiStarship>(`/starships/${id}/`);
}
