import { migrate } from "drizzle-orm/mysql2/migrator";
import { db } from "./schema.js";
 
 
migrate(db, { migrationsFolder: "database/migrations" }).then(() => {
  console.log("Migration successful");
}).catch((err) => {
  console.log("Migration failed", err);
}).finally(() => {
  process.exit();
});