# Kyzen: Learning & Implementation Roadmap (Target: Q4 Open-Source Release)

> **Mentor Note:** This roadmap is designed around learning by building. For each phase and week, tasks are broken down into digestible engineering steps paired with the core mental models and concepts you will master. **You will write the code yourself; I will guide, review, quiz, and provide progressively structured hints.**

---

## 🗺️ High-Level Roadmap Overview

```
Week 01-03: Phase 1 — Foundations, Data Modeling & Multi-Tenant Authentication
Week 04-07: Phase 2 — Core Project Management & Interactive Kanban System (MVP Target)
Week 08-10: Phase 3 — AI-Assisted Workflows & Developer Productivity Integrations
Week 11-13: Phase 4 — Activity Feeds, Notification Systems & Team Invitations
Week 14-15: Phase 5 — Automated Testing, Security Hardening & Performance Optimization
Week 16-17: Phase 6 — Docker Self-Hosting, CI/CD & Open-Source Public Release
```

---

## 📅 Phase 1: Foundations, Data Modeling & Multi-Tenant Auth (Weeks 1–3)

### Week 1: Relational Data Modeling & Prisma 7 Fundamentals
* **What you need to build:** Design and implement the full relational database schema for Organizations, Memberships, Projects, and Tasks.
* **What you need to learn:**
  - Relational modeling (1-to-many, many-to-many explicit join tables, cascading deletes).
  - Prisma 7 architecture (schema syntax, migrations, PostgreSQL adapter connection pooling).
* **Why you are learning it:** A solid data model is the backbone of any software system; getting multi-tenancy wrong early leads to painful data leaks and refactoring later.
* **Tasks to complete yourself:**
  1. Add `Organization` and `OrganizationMember` models to `prisma/schema.prisma`.
  2. Add `Project` and `Task` models with foreign keys, indexes, and enums (`Role`, `Priority`, `TaskStatus`).
  3. Generate and run the initial migration (`npx prisma migrate dev`).
  4. Write a database seed script (`prisma/seed.ts`) to populate mock organizations, users, and tasks for local development.
* **Verification:** Run `npx prisma studio` and confirm relations, cascade behaviors, and seed data integrity.
* **Explain in your own words afterward:** Why an explicit join table (`OrganizationMember`) is better than an implicit many-to-many relationship when modeling roles and invitation states.
* **Traps to watch for:** Forgetting database indexes on frequently queried foreign keys (e.g. `organizationId`, `projectId`), causing slow queries as tables grow.

---

### Week 2: Auth.js (NextAuth v5) & Session Architecture
* **What you need to build:** Complete authentication flow with GitHub OAuth, Google OAuth, and developer credentials fallback.
* **What you need to learn:**
  - NextAuth v5 (Auth.js) App Router integration.
  - JWT session strategy vs. Database session strategy trade-offs.
  - Session callbacks and augmenting TypeScript types (`Session`, `User`, `JWT`).
* **Why you are learning it:** Understanding how cookies, tokens, and identity propagation work in Next.js Server Components and Server Actions.
* **Tasks to complete yourself:**
  1. Set up GitHub and Google OAuth providers in `lib/auth.ts`.
  2. Implement session callback to attach active `userId` and default `organizationId` to the session.
  3. Build responsive Sign-In and Sign-Up UI pages in `app/(auth)/`.
  4. Create route protection using Next.js proxy/middleware or Server Component guards.
* **Verification:** Log in via OAuth and Credentials; verify session data on both Server Components and Client Components.
* **Explain in your own words afterward:** The difference between accessing session data in a Server Component (`await auth()`) vs. a Client Component (`useSession()`).

---

### Week 3: Multi-Tenant Workspace & Server Action Patterns
* **What you need to build:** Organization switcher component, workspace creation modal, and typed Server Action utilities.
* **What you need to learn:**
  - Next.js Server Actions: execution model, error handling, input validation with Zod.
  - Multi-tenant tenant resolution (cookies vs. URL params like `/[orgSlug]/...`).
* **Tasks to complete yourself:**
  1. Create a reusable Server Action wrapper with Zod schema validation and authenticated user context.
  2. Build `createOrganization` and `switchActiveOrganization` Server Actions.
  3. Build the Organization Switcher UI in the dashboard header/sidebar.
* **Verification:** Switch between two different organizations and verify that session context and active tenant ID update seamlessly.
* **Explain in your own words afterward:** How Server Actions prevent client-side parameter tampering when updating tenant-scoped records.

---

## 📅 Phase 2: Core Project Management & Interactive Kanban System (Weeks 4–7)

### Week 4: Project Management & Dashboard Shell
* **What you need to build:** Projects list, Project creation dialog, and workspace overview dashboard.
* **What you need to learn:**
  - React Server Components data fetching with Prisma queries.
  - Suspense boundaries, streaming, and loading skeletons.
* **Tasks to complete yourself:**
  1. Build project query services in `services/project.service.ts`.
  2. Implement project list page with empty states and creation modal.
  3. Add project settings page (rename, delete with cascade confirmation).
* **Verification:** Create, list, edit, and delete projects; observe seamless loading states using Suspense.

---

### Week 5: Task Data Architecture & List/Table Views
* **What you need to build:** Task creation modal, task list table, filtering by status, priority, and assignees.
* **What you need to learn:**
  - URL search params for stateful filtering (`nuqs` or Next.js `useSearchParams`).
  - Server-side filtering, sorting, and pagination with Prisma.
* **Tasks to complete yourself:**
  1. Implement task CRUD Server Actions with Zod validation.
  2. Build task creation dialog with title, markdown description, priority, and due date.
  3. Build filterable task list view with URL query synchronisation.
* **Verification:** Filter tasks by priority and status; refresh the page and verify filters persist in the URL.

---

### Week 6: Interactive Kanban Board & Drag-and-Drop
* **What you need to build:** Drag-and-drop Kanban board with status columns (`BACKLOG`, `TODO`, `IN_PROGRESS`, `IN_REVIEW`, `DONE`).
* **What you need to learn:**
  - Drag-and-Drop primitives in React (e.g. `@dnd-kit/core` or HTML5 Drag & Drop).
  - Optimistic UI updates with TanStack Query or React 19 `useOptimistic`.
* **Tasks to complete yourself:**
  1. Build Kanban board layout with column containers and draggable task cards.
  2. Implement drag-and-drop event handlers to update task status.
  3. Add optimistic state updates so the UI feels instant even on slow networks.
* **Verification:** Drag a card to a new column; disconnect network throttling to observe instant reordering and graceful error rollback if the server fails.
* **Explain in your own words afterward:** How optimistic updates work and how to handle rollback when the backend mutation fails.

---

### Week 7: Task Details Drawer & Markdown Rich Text
* **What you need to build:** Slide-over detail drawer for tasks with Markdown preview/editor, comments stream, and activity log.
* **What you need to learn:**
  - Sheet/Drawer component lifecycle and routing (Parallel Routes / Intercepting Routes or URL state).
  - Markdown parsing and sanitization.
* **Tasks to complete yourself:**
  1. Build task detail drawer opening upon task card click.
  2. Implement editable task title, status dropdown, and Markdown description viewer/editor.
  3. Implement task comment creation and display.
* **Verification:** Edit a task description in Markdown, add comments, and confirm real-time re-rendering in the board view.

---

## 📅 Phase 3: AI-Assisted Workflows & Developer Tools (Weeks 8–10)

### Week 8: AI Service Layer & Prompt Engineering
* **What you need to build:** Core AI service abstraction supporting streaming responses and structured JSON outputs.
* **What you need to learn:**
  - Vercel AI SDK / OpenAI API streaming protocols.
  - Structured output parsing with Zod schemas.
  - Rate limiting and API key management.
* **Tasks to complete yourself:**
  1. Build AI service client in `services/ai.service.ts`.
  2. Create prompt templates for task auto-breakdown and feature decomposition.
  3. Build an API route or server action supporting streaming AI text.
* **Verification:** Test streaming completions in development; ensure errors like rate limits or missing API keys are handled gracefully.

---

### Week 9: AI Task Breakdown Generator
* **What you need to build:** Interactive UI where entering a feature prompt automatically generates checklist subtasks.
* **What you need to learn:**
  - Streaming UI hooks (`useCompletion` / `useChat` / custom stream readers).
  - Converting AI structured JSON into interactive checkbox lists in the task drawer.
* **Tasks to complete yourself:**
  1. Build the "Generate Subtasks with AI" button inside the Task detail drawer.
  2. Parse AI generated subtasks and allow users to accept/reject individual items before saving to database.
* **Verification:** Click generate on a high-level task (e.g. "Implement Stripe Billing"); accept 4 subtasks and verify they persist as child tasks.

---

### Week 10: AI Code Review & Snippet Assistant
* **What you need to build:** Code snippet review assistant that identifies bugs, performance bottlenecks, and security vulnerabilities.
* **What you need to learn:**
  - Syntax highlighting integration (e.g., Shiki / Prismjs).
  - Contextual AI prompts with system instructions tailored to code review.
* **Tasks to complete yourself:**
  1. Build Code Snippet dialog with language selection and syntax highlighting.
  2. Send snippet to AI review pipeline and display formatted critique (suggestions, security notes, performance tips).
* **Verification:** Submit sample buggy code; verify that the AI returns structured, actionable recommendations.

---

## 📅 Phase 4: Activity Feeds, Notifications & Team Collaboration (Weeks 11–13)

### Week 11: Audit Trail & Activity Logging System
* **What you need to build:** Unified activity logging system tracking task movements, project changes, and member actions.
* **What you need to learn:**
  - Event logging patterns in relational databases.
  - Designing an append-only `ActivityLog` schema.
* **Tasks to complete yourself:**
  1. Model `ActivityLog` in Prisma (`actionType`, `entityId`, `metadata`, `userId`, `organizationId`).
  2. Create centralized logging helper invoked by Server Actions.
  3. Build workspace activity timeline UI widget.
* **Verification:** Perform various actions (create task, change status, invite member); verify the timeline displays chronological updates.

---

### Week 12: Notification System & Alerts
* **What you need to build:** In-app notification popover, unread count badge, and notification preferences.
* **What you need to learn:**
  - Polling vs. WebSockets / Server-Sent Events (SSE) trade-offs.
  - Optimistic mark-as-read state.
* **Tasks to complete yourself:**
  1. Model `Notification` in Prisma (`userId`, `title`, `message`, `read`, `link`).
  2. Implement notification trigger when a user is assigned to a task or mentioned.
  3. Build notification center dropdown in dashboard header.
* **Verification:** Assign a task to another test user; switch accounts and verify the unread notification appears.

---

### Week 13: Team Member Invitations & RBAC Controls
* **What you need to build:** Team management tab, member invitation by email with secure tokens, role modification.
* **What you need to learn:**
  - Cryptographic token generation and expiration.
  - Role-based authorization policies (Owner, Admin, Member, Viewer).
* **Tasks to complete yourself:**
  1. Implement invitation model and token generation.
  2. Build Invite Member dialog and invite acceptance page (`/invite/[token]`).
  3. Enforce RBAC rules (e.g., only Admins/Owners can delete projects or invite members).
* **Verification:** Send an invite, accept with a new user account, and test role-restricted action prevention.

---

## 📅 Phase 5: Testing, Hardening & Optimization (Weeks 14–15)

### Week 14: Unit & Integration Testing
* **What you need to build:** Comprehensive test suite for services, validation schemas, and critical UI workflows.
* **What you need to learn:**
  - Vitest test runner configuration for Next.js.
  - Testing database interactions with test databases / transactions.
  - Playwright end-to-end (E2E) testing for core user journeys.
* **Tasks to complete yourself:**
  1. Set up Vitest and write unit tests for Zod schemas and utility functions.
  2. Write integration tests for `project.service.ts` and `task.service.ts`.
  3. Set up Playwright and write an E2E test for Sign-in -> Create Project -> Create Task -> Move Task.
* **Verification:** Run `npm run test` and `npx playwright test`; ensure all tests pass cleanly.

---

### Week 15: Security Audits, RBAC Hardening & Performance
* **What you need to build:** Security headers, rate limiting middleware, database query optimization, bundle size audit.
* **What you need to learn:**
  - OWASP Top 10 vulnerabilities in Next.js applications (CSRF, XSS, IDOR, SQL injection).
  - React 19 performance profiling and Next.js bundle analysis.
  - Prisma query optimization (preventing N+1 queries with proper `include` / `select`).
* **Tasks to complete yourself:**
  1. Audit every Server Action for tenant authorization checks (preventing IDOR).
  2. Implement rate limiting on auth and AI endpoints (`@upstash/ratelimit` or in-memory token bucket).
  3. Configure security headers in `next.config.ts` (Content-Security-Policy, X-Frame-Options).
  4. Optimize Prisma queries and verify database execution plans.
* **Verification:** Test IDOR resistance by attempting to access organization A's task using organization B's session; confirm HTTP 403 Forbidden.

---

## 📅 Phase 6: Deployment, CI/CD & Open-Source Launch (Weeks 16–17)

### Week 16: Docker Containerization & 1-Click Self-Hosting
* **What you need to build:** Production `Dockerfile` and `docker-compose.yml` for 1-click self-hosting with PostgreSQL.
* **What you need to learn:**
  - Multi-stage Docker builds for Next.js standalone output.
  - Environment variable validation on startup.
* **Tasks to complete yourself:**
  1. Enable `output: 'standalone'` in `next.config.ts`.
  2. Create production multi-stage `Dockerfile`.
  3. Create `docker-compose.yml` bundling Kyzen web and PostgreSQL.
  4. Test local container startup from scratch.
* **Verification:** Run `docker compose up --build` on a clean machine/port and access the complete application.

---

### Week 17: CI/CD, Documentation Polish & Public Release
* **What you need to build:** GitHub Actions workflows for continuous integration and automated releases.
* **What you need to learn:**
  - GitHub Actions syntax, caching dependencies, and matrix builds.
  - Open-source repository hygiene (issue templates, release notes, badges).
* **Tasks to complete yourself:**
  1. Create `.github/workflows/ci.yml` (Lint, Typecheck, Test, Build).
  2. Polish `README.md` with demo screenshots, architecture diagrams, and quickstart commands.
  3. Tag version `v1.0.0` and publish the release.
* **Verification:** Push a commit, verify GitHub Actions run green, and verify the release assets.
