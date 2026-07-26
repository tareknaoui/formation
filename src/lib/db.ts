import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL || "";

const createPrismaClient = () => {
  if (!connectionString) {
    return new PrismaClient();
  }
  const isNeon = connectionString.includes("neon.tech") || connectionString.includes("sslmode=");
  const pool = new Pool({
    connectionString,
    ssl: isNeon ? { rejectUnauthorized: false } : undefined,
    max: process.env.NODE_ENV === "production" ? 10 : 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export const db = prisma;
