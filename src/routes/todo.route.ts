import { Hono } from 'hono';
import {
  NewTodo,
  allTodo,
  deleteTodo,
  detailTodo,
  insertTodo,
  updateTodo,
} from '../db/db.query';
import auth from '../helpers/auth.helper';

const todos = new Hono();

todos.use('/*', async (c, next) => {
  const payload = await auth(c, next);
  return payload;
});

todos
  .get('/', async (c) => {
    const payload = c.get('jwtPayload');
    try {
      const all = await allTodo(payload.sub);
      return c.json({ data: all, name: payload.name }, 200);
    } catch (error) {
      console.log(error);
      return c.json({ message: 'Terjadi Kesalahan Pada Server' }, 503);
    }
  })
  .post(async (c) => {
    const payload = c.get('jwtPayload');
    try {
      const { description, date } = await c.req.json();

      const data: NewTodo = {
        userId: payload.sub,
        description: description,
        date: date,
      };

      await insertTodo(data);

      return c.json({ message: 'Data Berhasil Ditambahkan' }, 201);
    } catch (error) {
      console.log(error);
      return c.json({ message: 'Terjadi Kesalahan Pada Server' }, 503);
    }
  });

todos
  .get('/:id', async (c) => {
    const id = c.req.param('id');

    try {
      const data = await detailTodo(parseInt(id));
      return c.json({ data: data }, 200);
    } catch (error) {
      console.log(error);
      return c.json({ message: 'Terjadi Kesalahan Pada Server' }, 503);
    }
  })
  .put(async (c) => {
    const id = c.req.param('id');

    try {
      const body = await c.req.json();
      await updateTodo(body, parseInt(id));
      return c.json({ message: 'Data Berhasil Diperbarui' }, 201);
    } catch (error) {
      console.log(error);
      return c.json({ message: 'Terjadi Kesalahan Pada Server' }, 503);
    }
  })
  .delete(async (c) => {
    const id = c.req.param('id');

    try {
      await deleteTodo(parseInt(id));
      return c.json({ message: 'Data Berhasil Dihapus' }, 200);
    } catch (error) {
      console.log(error);
      return c.json({ message: 'Terjadi Kesalahan Pada Server' }, 503);
    }
  });

export default todos;
