import { Context, Next } from 'hono';
import { jwt } from 'hono/jwt';

const auth = async (c: Context, next: Next) => {
  const jwtMiddleware = jwt({
    secret: process.env.SECRET as string,
  });
  try {
    await jwtMiddleware(c, next);
  } catch (error) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
};

export default auth;
