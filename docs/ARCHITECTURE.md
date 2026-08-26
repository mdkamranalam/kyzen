# Architecture

## App structure

The project is built on Next.js and follows a modular structure:

- `app/` or `pages/` - page and route definitions
- `components/` - UI components
- `lib/` - helper functions, API clients, and shared logic
- `public/` - static files and assets
- `styles/` - CSS / Sass styles

## Data flow

- UI components request data through `lib/` or server actions.
- API routes and server-side logic are handled by Next.js route handlers.
- Shared state may be managed through React context, hooks, or external stores (like Zustand).

## Database & ORM

- **Database:** PostgreSQL.
- **ORM:** Prisma is used for schema management and type-safe database queries.
- **Location:** The database schema is defined in `prisma/schema.prisma` and the initialized Prisma client is exported from `lib/prisma.ts`.

## Authentication

- **Provider:** Auth.js (NextAuth v5).
- **Strategy:** We are using database-backed sessions with the Prisma Adapter. The necessary models (`User`, `Account`, `Session`) are defined in the Prisma schema.

## Agent system

- `AGENTS.md` defines agent-related conventions and triggers.
- `CLAUDE.md` links agent rules into Claude-related usage.
- The app appears to use Next.js custom agents and integration with AI tooling.

## Deployment

- Build with `npm run build`
- Deploy to the chosen platform, ensuring environment variables are configured.
- Validate production behavior through `npm run start` or deployment preview.
