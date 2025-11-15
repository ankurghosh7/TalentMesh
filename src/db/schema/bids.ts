import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
export const bids = pgTable("bids", {
  id: serial("id").primaryKey(),
  job_id: integer("job_id").notNull(),
  freelancer_id: integer("freelancer_id").notNull(),
  amount: integer("amount"),
  cover: text("cover"),
  created_at: timestamp("created_at").defaultNow(),
});
