import "dotenv/config";
import { Pool } from "pg";

const databaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Database URL is not defined");
}

export const pool = new Pool({
  connectionString: databaseUrl,
});