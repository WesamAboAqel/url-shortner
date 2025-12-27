# URL Shortener

Minimal URL shortener built with Express, TypeScript, Kysely, and PostgreSQL. The server exposes a JSON API for creating, updating, deleting, and redirecting shortened links, and serves a small Tailwind-powered UI from `site/`.

This project is built as part of: https://roadmap.sh/projects/url-shortening-service

## Quick Start

1. Install dependencies: `npm install`
2. Create `.env` with your database connection string:

```
DATABASE_URL=postgresql://url-shortner_admin:12345678@localhost:5432/url-shortner_db
```

3. Apply migrations: `npm run db:migrate`
4. Start the server: `npm run dev` (listens on `http://localhost:3000`).

Docker Compose: `docker compose up --build` starts the API at port 3000 and a PostgreSQL 18 instance at port 5432 (credentials match the sample `DATABASE_URL` above).

## Scripts

-   `npm run dev` — watch-mode API server with `ts-node`.
-   `npm run db:migrate` — run all Kysely migrations in `database/migrations`.
-   `npm run db:create-migration -- <name>` — scaffold a timestamped migration file.

## API

-   `GET /api/hello` — health check.
-   `POST /api/url/` — create a short link. Body: `{ "original_url": "https://example.com" }`. Returns the stored row with `short_url`.
-   `GET /:short_url` — redirects to the original URL and increments `visit_count`.
-   `PUT /api/url/` — update the destination. Body: `{ "short_url": "abc12345", "original_url": "https://new.example" }`.
-   `DELETE /api/url/` — delete by short code. Body: `{ "short_url": "abc12345" }`.

## Frontend

The static UI at `/` (files in `site/`) posts to `POST /api/url` and displays the generated short link. Tailwind CSS input lives in `site/input.css`; rebuild the bundled stylesheet with:

```
npx @tailwindcss/cli -i ./site/input.css -o ./site/output.css
```

## Data Model

Single table `url`:

-   `short_url` (PK, 8 chars)
-   `original_url` (text)
-   `visit_count` (int, default 0)
-   `created_at`, `updated_at` (timestamps)

## Logging & Errors

Requests are logged with method coloring and timestamps (`middleware/logger.ts`). Uncaught errors bubble to `middleware/error_handler.ts`, returning HTTP 500 with the error message.
