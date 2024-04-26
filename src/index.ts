import { Hono } from 'hono';
import todos from './routes/todo.route';
import auth from './routes/auth.route';
import user from './routes/user.route';

const app = new Hono().basePath('/v1');

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/auth', auth);
app.route('/user', user);
app.route('/todos', todos);

export default app;
