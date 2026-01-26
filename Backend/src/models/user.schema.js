import {
  mysqlTable,
  timestamp,
  foreignKey,
  varchar,
  boolean,
  uniqueIndex,
  index,
  text,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';


export const usersTable = mysqlTable(
  'users',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),
    userNumber: varchar('user_number', { length: 30 }).notNull(),

    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),


    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },

)