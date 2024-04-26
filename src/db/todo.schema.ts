import {
  date,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('user', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 10 }).unique().notNull(),
  password: varchar('password', { length: 255 }).unique().notNull(),
});

export const todos = mysqlTable('todo', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
  date: date('date').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  userId: int('userId')
    .references(() => users.id)
    .notNull(),
});
