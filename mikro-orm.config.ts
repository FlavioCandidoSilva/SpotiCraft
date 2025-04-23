import * as dotenv from 'dotenv';
dotenv.config();

import { defineConfig, MySqlDriver } from '@mikro-orm/mysql';
import { SongEntity } from 'src/infrastructure/database/songs/entities/song';

export default defineConfig({
  driver: MySqlDriver,
  host: process.env.DEV_DB_HOST || 'localhost',
  port: +(process.env.DEV_DB_PORT || 3306),
  user: process.env.DEV_DB_USERNAME || 'root',
  password: process.env.DEV_DB_PASSWORD || '',
  dbName: process.env.DEV_DB_NAME || 'spoticraft',
  entities: [SongEntity],
  entitiesTs: ['src/infrastructure/database/**/*.ts'],
  migrations: {
    path: 'dist/infrastructure/database/migrations',
    pathTs: 'src/infrastructure/database/migrations',
  },
});