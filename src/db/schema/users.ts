import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  password: text("password").notNull(),
  role: varchar("role", { length: 32 }).default("FREELANCER"),
  free_bids: integer("free_bids").default(10),
  credits: integer("credits").default(0),
  created_at: timestamp("created_at").defaultNow(),
});
