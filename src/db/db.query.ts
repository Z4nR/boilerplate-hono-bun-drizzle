import { asc, count, eq } from 'drizzle-orm';
import db from './db.connection';
import { todos, users } from './todo.schema';

export type NewUser = typeof users.$inferInsert;
export type NewTodo = typeof todos.$inferInsert;

export const insertUser = async (user: NewUser) => {
  return await db.transaction(async (tx) => {
    await tx.insert(users).values(user);
    const data = await tx
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, user.username))
      .limit(1)
      .orderBy(asc(users.id));
    return data[0].id;
  });
};

export const userExist = async (user: string) => {
  const data = await db
    .select({ value: count(users.username) })
    .from(users)
    .where(eq(users.username, user));

  return data[0];
};

export const userData = async (user: string) => {
  const data = await db
    .select()
    .from(users)
    .where(eq(users.username, user))
    .limit(1)
    .orderBy(asc(users.username), asc(users.id));

  return data[0];
};

export const insertTodo = async (todo: NewTodo) => {
  await db.insert(todos).values(todo);
};

export const updateTodo = async (todo: NewTodo, id: number) => {
  await db.update(todos).set(todo).where(eq(todos.id, id));
};

export const allTodo = async (id: number) => {
  const data = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, id))
    .orderBy(asc(todos.id));

  return data;
};

export const deleteTodo = async (id: number) => {
  await db.delete(todos).where(eq(todos.id, id));
};

export const detailTodo = async (id: number) => {
  const data = await db.select().from(todos).where(eq(todos.id, id));

  return data[0];
};
