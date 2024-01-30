// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  age: integer("age"),
  roleId: integer("roleId")
    .notNull()
    .references(() => roles.id),
});

export const userRelations = relations(users, ({ one }) => {
  return {
    role: one(roles, {
      fields: [users.roleId],
      references: [roles.id],
    }),
  };
});

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
});

export const roleRelations = relations(roles, ({ many }) => {
  return {
    users: many(users),
  };
});

export const dogs = pgTable("dogs", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  age: integer("age"),
  breed: varchar("breed")
});