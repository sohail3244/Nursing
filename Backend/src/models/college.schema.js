import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  boolean,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const collegesTable = mysqlTable("colleges", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

  name: varchar("name", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // govt / private
  fees: int("fees").notNull(),

  isActive: boolean("is_active").default(true),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
