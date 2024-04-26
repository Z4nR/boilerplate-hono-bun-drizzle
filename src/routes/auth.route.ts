import { Hono } from 'hono';
import { tokenSign } from '../middlewares/token';
import { NewUser, insertUser, userData, userExist } from '../db/db.query';

const auth = new Hono();

auth.post('/register', async (c) => {
  try {
    const { username, password } = await c.req.json();

    const user = await userExist(username);
    if (user.value > 0) {
      return c.json(
        { message: 'Data User Sudah Ada, Silahkan Gunakan Username Lain' },
        400
      );
    }

    const hash = Bun.password.hashSync(password, {
      algorithm: 'bcrypt',
    });

    const newUser: NewUser = {
      username: username,
      password: hash,
    };

    const userId = await insertUser(newUser);

    const token = await tokenSign(newUser.username, userId);

    return c.json({ token: token }, 201);
  } catch (error) {
    return c.json({ message: 'Terjadi Kesalahan Pada Server' }, 503);
  }
});

auth.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json();

    const user = await userData(username);

    if (!user || !Bun.password.verifySync(password, user.password)) {
      return c.json(
        { message: !user ? 'Invalid username' : 'Invalid password' },
        401
      );
    }

    const token = await tokenSign(username, user.id);

    return c.json({ token: token }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ message: 'Terjadi Kesalahan Pada Server' }, 503);
  }
});

export default auth;
