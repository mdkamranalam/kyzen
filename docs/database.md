# Database Architecture

This document describes the database architecture for the Kyzen project, which relies on PostgreSQL and Prisma ORM.

## Overview

Currently, our database schema is focused on the **Authentication layer**. We use Auth.js (NextAuth), which requires a specific set of tables to function correctly when using a database-backed session strategy.

## Models

### User
The `User` model represents a registered user in Kyzen.
- `id`: Unique identifier (CUID).
- `name`: Full name of the user.
- `email`: User's email address (unique).
- `image`: URL to the user's avatar.
- `emailVerified`: Timestamp of when the email was verified.

### Account
The `Account` model handles OAuth connections. A single `User` can have multiple `Account` records if they sign in with multiple providers (e.g., GitHub, Google) using the same email.
- `provider`: The OAuth provider (e.g., `github`, `google`).
- `providerAccountId`: The unique ID given by the OAuth provider.
- `access_token` / `refresh_token`: OAuth tokens for API access.

### Session
The `Session` model is used to manage active user sessions.
- `sessionToken`: The token stored in the user's browser cookie.
- `expires`: The expiration date of the session.
- `userId`: Foreign key linking to the `User`.

## Prisma Client

We instantiate a singleton Prisma Client in `lib/prisma.ts`. This prevents Next.js from establishing multiple database connections during hot-reloads in development.

## Business Logic Models

### Organization
The `Organization` model represents a collaborative workspace container (e.g., a company or a team).
- `id`: Unique identifier (CUID).
- `name`: Display name of the organization.
- `slug`: Unique URL-friendly slug.
- `logo`: Optional URL to the organization's logo.

### OrganizationMember
The `OrganizationMember` model is a join table connecting a `User` to an `Organization` with a specific role.
- `role`: Enum (`OWNER`, `ADMIN`, `MEMBER`).
- `userId`: Foreign key linking to the `User`.
- `organizationId`: Foreign key linking to the `Organization`.
- Features a composite unique constraint on `[userId, organizationId]` to prevent duplicate memberships.
