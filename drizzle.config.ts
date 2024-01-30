import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    host: "localhost",
    database: "postgres",
    password: "mysecretpassword",
    port: 5432,
    user: "postgres",
  },
  tablesFilter: ["drizzle-demo_*"],
  out: "./src/server/db/migrations",
  breakpoints: false,
} satisfies Config;
