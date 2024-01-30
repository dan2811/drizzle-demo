import { migrate } from "drizzle-orm/node-postgres/migrator";
import { client, db } from ".";

// This will run migrations on the database, skipping the ones already applied
try {
  await migrate(db, {
    migrationsFolder: "./src/server/db/migrations",
  });
  console.log("MIGRATION SUCCESSFUL");
} catch (e) {
  console.error("ERROR RUNNING MIGRATION: ", e);
} finally {
  console.log("CLOSING CONNECTION");
  // Don't forget to close the connection, otherwise the script will hang
  void client.end();
}
