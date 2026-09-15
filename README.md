# AsadTube

A personal portfolio that creatively showcases Asad Jaffery’s career, inspired by a YouTube channel page.

Built with Next.js App Router, React, and TypeScript. Uses plain CSS to keep things simple.

## Getting started

Use Node.js 24 (`nvm use` if you have nvm installed).

```sh
npm ci
npm run dev
```

Open http://localhost:3100.

## Commands

- `npm run check` — ESLint and strict TypeScript checks.
- `npm run build` — create a production build.
- `npm start` — serve the production build on port 3100.
- `npm run format` — format source files with Prettier.

GitHub Actions runs checks and a production build on pushes and pull requests.

## Project structure

- `src/app/` — page, root layout, metadata, and global CSS.
- `src/components/` — portfolio interactions and project cards.
- `src/data/projects.ts` — typed career and project content.
- `src/data/highlights.ts` — articles and moments featured in Highlights.
- `src/app/api/github/` — server-side GitHub contribution calendar, cached for an hour.
- `public/assets/` — logos and favicon.

Career, Highlights, and Music are the three views. About, other sidebar shortcuts, and search are static YouTube-style controls. The navigation drawer, career dialogs, and sharing work in the browser. Project details reuse existing content; expand them in `src/data/projects.ts` as the portfolio develops.

Deploy using a host that supports Next.js. The previous static `dist` server has been replaced by Next.js.

The channel banner uses the GitHub contribution graph from `asad-portfolio`, including its staggered fade-in animation. Set `GITHUB_TOKEN` in `.env` (see `.env.example`) to load Asad-Jaffery’s activity. Credentials stay on the server. The graph includes loading and retry states and respects reduced-motion preferences.

## Music

Music shows the five most recently played Spotify tracks, cached for five minutes. Album cards link to Spotify; no playback or visitor login is required.

Set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` in `.env`. The refresh token must include `user-read-recently-played`. Songs appear in listening order, newest first; repeated plays are kept.

Run `npm run spotify:token` to authorize those permissions and save the new refresh token directly to `.env`. The helper defaults to `http://127.0.0.1:3000/callback`; set `SPOTIFY_REDIRECT_URI` if your Spotify app uses another registered redirect. Restart the app after updating credentials.
