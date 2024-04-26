import { sign } from 'hono/jwt';

export const tokenSign = async (user: string, id: number) => {
  const payload = {
    sub: id,
    id: crypto.randomUUID(),
    name: user,
    exp: Math.floor(Date.now() / 1000) + 60 * 30,
  };
  return await sign(payload, process.env.SECRET as string);
};
