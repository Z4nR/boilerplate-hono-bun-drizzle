import { Hono } from 'hono';
import auth from '../helpers/auth.helper';

const user = new Hono();

user.use('/*', async (c, next) => {
  const payload = await auth(c, next);
  return payload;
});

user.get('/me', (c) => {
  const payload = c.get('jwtPayload');
  console.log(payload);

  if (!payload) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  return c.json({ name: payload.name });
});

export default user;
