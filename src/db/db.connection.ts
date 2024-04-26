import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';

const connection = createPool({
  uri: process.env.URI_MYSQL,
});

const db = drizzle(connection);

export default db;
