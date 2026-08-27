# Kyzen Development Guide

Welcome to the Kyzen development workflow. This guide outlines how to set up your environment, write code, adhere to coding standards, and maintain project health.

---

## 1. Local Environment Setup

### Prerequisites
- **Node.js**: v22.x or higher
- **npm**: v10.x or higher (or pnpm/yarn)
- **PostgreSQL**: v15+ running locally or in a cloud instance (e.g. Supabase, Neon, Prisma Postgres)

### Step-by-Step Initialization
1. **Clone repository:**
   ```bash
   git clone https://github.com/mdkamranalam/kyzen.git
   cd kyzen
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Configure `DATABASE_URL` and `AUTH_SECRET` (generate with `openssl rand -base64 32`).

4. **Initialize Database:**
   ```bash
   npx prisma db push # or npx prisma migrate dev
   ```

5. **Start Dev Server:**
   ```bash
   npm run dev
   ```

---

## 2. Daily Development Workflow

1. **Create a topic branch:**
   ```bash
   git checkout -b feature/organization-switcher
   # or
   git checkout -b fix/auth-token-refresh
   ```
2. **Make focused, incremental commits:**
   Follow conventional commits format: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`.
3. **Validate before pushing:**
   ```bash
   npm run lint
   npm run build
   ```

---

## 3. Code Standards & Best Practices

- **Strict TypeScript:** No `any` types. Model domain types clearly in `types/` or infer directly from Prisma/Zod schemas.
- **Server Action Boundaries:** Always validate inputs using Zod before interacting with the database.
- **UI Styling:** Use Tailwind CSS utility classes. Avoid inline style objects unless calculating dynamic positioning.
- **Accessibility (a11y):** Ensure interactive elements have proper `aria-labels`, focus states, and keyboard navigation support.
- **Error Boundaries:** Use Next.js `error.tsx` and React error boundaries to catch unexpected rendering crashes gracefully.
