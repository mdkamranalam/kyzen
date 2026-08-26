# Authentication Architecture

Kyzen uses **Auth.js (NextAuth v5)** for secure, flexible authentication.

## Strategy

We use a **Database Session** strategy. This means that instead of relying purely on encrypted JWTs (JSON Web Tokens) stored in cookies, we store a session token in the database and reference it. This allows us to instantly revoke sessions and manage active logins from the server.

## Providers

Based on our environment configuration, we plan to support:
- **GitHub OAuth**
- **Google OAuth**

### Developer Login (Local Development)
To bypass the OAuth setup during early development, we have implemented a **Developer Login** using NextAuth's `Credentials` provider. 
- A one-click login creates/fetches a dummy user (`dev@kyzen.local`).
- It uses a **JWT strategy** (JSON Web Token) instead of database sessions purely for this development bypass.

## Integration Flow

1. **Sign In**: User clicks "Sign in with GitHub".
2. **OAuth Callback**: NextAuth handles the OAuth handshake.
3. **Database Sync**: 
   - If the user is new, NextAuth creates a `User` record and an `Account` record.
   - If the user exists, NextAuth links the new `Account` to the existing `User`.
4. **Session Creation**: NextAuth generates a session token, stores it in the `Session` table, and sets a secure HTTP-only cookie on the client.
5. **Route Protection**: Next.js Middleware and Server Actions will verify the presence and validity of this session cookie to protect private routes (e.g., Workspaces, Projects).
