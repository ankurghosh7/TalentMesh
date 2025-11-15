import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 512 }).notNull(),
  description: text("description").notNull(),
  client_id: integer("client_id").notNull(),
  is_open: boolean("is_open").default(true),
  created_at: timestamp("created_at").defaultNow(),
});
