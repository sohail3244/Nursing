import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const leadsTable = mysqlTable("leads", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

  name: varchar("name", { length: 150 }).notNull(),
  email: varchar("email", { length: 150 }),
  phone: varchar("phone", { length: 20 }).notNull(),

  course: varchar("course", { length: 150 }),
  college: varchar("college", { length: 150 }),

  source: varchar("source", { length: 100 }).default("website"),

  createdAt: timestamp("created_at").defaultNow(),
});
