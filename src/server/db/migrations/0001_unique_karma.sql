ALTER TABLE "roles" DROP CONSTRAINT "roles_users_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "roleId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "roles" DROP COLUMN IF EXISTS "users";