import * as dotenv from 'dotenv';
dotenv.config();

import { defineConfig, MySqlDriver } from '@mikro-orm/mysql';
import { SongEntity } from 'src/infrastructure/database/songs/entities/song';
import { ArtistEntity } from 'src/infrastructure/database/artists/entities/artist';
import { AlbumEntity } from 'src/infrastructure/database/albums/entities/album';
import { PlaylistEntity } from 'src/infrastructure/database/playlists/entities/playlist';
import { UserEntity } from 'src/infrastructure/database/users/entities/user';

export default defineConfig({
  driver: MySqlDriver,
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  dbName: process.env.DB_NAME || 'spoticraft',
  entities: [SongEntity, ArtistEntity, AlbumEntity, PlaylistEntity, UserEntity],
  entitiesTs: ['src/infrastructure/database/**/*.ts'],
  migrations: {
    path: 'dist/infrastructure/database/migrations',
    pathTs: 'src/infrastructure/database/migrations',
  },
});