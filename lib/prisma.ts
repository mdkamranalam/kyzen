import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// 1. Create a Postgres connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Wrap it in the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to PrismaClient
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
