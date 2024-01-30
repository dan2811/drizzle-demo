import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";
import { env } from "~/env";

export const client = new Client({
  host: env.HOST,
  port: env.PORT,
  user: env.USER,
  password: env.PASSWORD,
  database: env.DATABASE,
});

await client.connect();

export const db = drizzle(client, {
  schema: schema,
});
