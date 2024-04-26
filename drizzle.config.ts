import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/todo.schema.ts',
  out: './migration',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.URI_MYSQL as string,
  },
} satisfies Config;
