import { EntitySchema } from '@mikro-orm/core';
import { Song } from 'src/domain/songs/entities/song';


export const SongSchema = new EntitySchema<Song>({
  class: Song,
  tableName: 'songs',
  properties: {
    id: { type: 'bigint', primary: true, autoincrement: true, unsigned: true },
    title: { type: 'text', nullable: false },
    duration: { type: 'int', nullable: false },
    // albumId: { type: 'int', nullable: false },
    // artistsId: { type: 'int', nullable: false },
    genres: { type: 'text', nullable: false },
    url: { type: 'text', nullable: false },
    explicit: { type: 'boolean', nullable: false },
    releaseDate: { type: 'date', nullable: false },
    createdAt: { type: 'date', nullable: false, defaultRaw: 'CURRENT_TIMESTAMP' },
    updatedAt: { type: 'date', nullable: false, defaultRaw: 'CURRENT_TIMESTAMP' },
    deletedAt: { type: 'date', nullable: true, defaultRaw: null },
  },
});