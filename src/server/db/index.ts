import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";
import { env } from "~/env";

export const client = new Client({
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  ssl: true,
});

await client.connect();

export const db = drizzle(client, {
  schema: schema,
});
