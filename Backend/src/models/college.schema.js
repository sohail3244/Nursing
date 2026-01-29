import { mysqlTable, varchar, text, int, json, timestamp } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const collegesTable = mysqlTable("colleges", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 255 }).notNull().unique(),

  description: text("description"),

  sector: varchar("sector", { length: 100 }),
  establishedYear: int("established_year"),
  genderAcceptance: varchar("gender_acceptance", { length: 50 }),

  state: varchar("state", { length: 100 }),
  district: varchar("district", { length: 100 }),
  city: varchar("city", { length: 100 }),
  address: text("address"),

  googleMapLink: text("google_map_link"),

  affiliation: text("affiliation"),
  approvedBy: text("approved_by"),

  coursesCount: int("courses_count"),
  experienceYears: int("experience_years"),

  facilities: json("facilities"),  

  thumbnail: varchar("thumbnail", { length: 255 }),
  gallery: json("gallery"),

  createdAt: timestamp("created_at").defaultNow(),
});
