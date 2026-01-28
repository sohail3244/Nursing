import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  boolean,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const coursesTable = mysqlTable(
  "courses",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),

    collegeId: varchar("college_id", { length: 36 }).notNull(),

    name: varchar("name", { length: 255 }).notNull(),

    code: varchar("code", { length: 100 }).notNull(), // ✅ UNIQUE CODE

    duration: varchar("duration", { length: 50 }).notNull(),
    eligibility: varchar("eligibility", { length: 255 }),

    isActive: boolean("is_active").default(true),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  },
  (table) => ({
    courseCodeUnique: uniqueIndex("course_code_unique").on(table.code),
  })
);
