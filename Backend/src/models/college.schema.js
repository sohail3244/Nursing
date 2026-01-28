import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  boolean,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const collegesTable = mysqlTable(
  "colleges",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),

    name: varchar("name", { length: 255 }).notNull(),

    code: varchar("code", { length: 255 }).notNull(), // ✅ FIXED

    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    type: varchar("type", { length: 50 }).notNull(),

     image: varchar("image", { length: 255 }),


    isActive: boolean("is_active").default(true),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  },
  (table) => ({
    codeUnique: uniqueIndex("code_unique").on(table.code),
  })
);
