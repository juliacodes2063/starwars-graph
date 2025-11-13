# Star Wars Heroes (test task)

This is a small React application built as a test task.  
The app shows a paginated list of Star Wars characters and a details page with a small graph of relations between a hero, films, and starships.

The project is built with Vite + React + TypeScript and uses React Query for data fetching and React Flow for the hero graph.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7** as a build tool and dev server
- **React Router 7** for routing
- **@tanstack/react-query 5** for data fetching and caching
- **React Flow** for visualizing the hero–films–starships graph
- **Framer Motion** for small UI animations
- **SCSS modules** for styling
- **ESLint** + **Prettier** for code style
- **Stylelint** for styles
- **Vitest** + **@testing-library/react** + **jsdom** for unit tests

## API layer

For API access I used a small wrapper around the native `fetch` to keep calls in one place.  
The wrapper can be easily replaced with an Axios instance if project requirements grow.

## Images: why Akabab instead of starwars-visualguide

The test task suggests using `https://starwars-visualguide.com` as an image source.  
In practice this endpoint is effectively unusable and cannot be relied on at all.

To keep the UI consistent, I used the public **Akabab Star Wars API** as a more stable image provider:

- `https://akabab.github.io/starwars-api/api/all.json` returns a list of characters with `id` and `image` fields.
- The app builds a `heroId -> imageUrl` map once and then looks up images by the same numeric id as in the main Star Wars API.

## Installation and running

### Prerequisites

- Node 20 
- npm (comes with Node)

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

Vite will print the local dev URL, usually:

* [http://localhost:5173](http://localhost:5173)

## Linting and formatting

JavaScript/TypeScript linting:

```bash
npm run lint
```

Styles linting (SCSS/CSS):

```bash
npm run lint:styles
```

Prettier is integrated via ESLint (`eslint-plugin-prettier` and `eslint-config-prettier`).

## Testing

Unit tests are written with Vitest and `@testing-library/react`.

Run all tests:

```bash
npm run test
```

The main areas covered by tests:

* Core graph logic (`buildGraph`)
* Heroes list and integration with the image map (`HeroList`)
* Pagination behaviour (disabled/enabled states and callbacks)
* Page-level container where it is meaningful (`HeroesPage`)
* Small shared utility for extracting ids from API URLs (`getIdFromUrl`)

The goal was to cover the main components and logic (as required by the test task), not every presentational component.
