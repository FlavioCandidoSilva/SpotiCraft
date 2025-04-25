import { EntitySchema } from '@mikro-orm/core';
import { Artist } from 'src/domain/artists/entities/artist';
import { Song } from 'src/domain/songs/entities/song';

export const ArtistSchema = new EntitySchema<Artist>({
  class: Artist,
  tableName: 'artists',
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    name: { type: 'string' },
    genre: { type: 'string' },
    biography: { type: 'string', nullable: true },
    songs: {
      entity: () => Song,
      kind: '1:m',
      mappedBy: (song) => song.artist,
      orphanRemoval: true,
      lazy: true,
    },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date', nullable: true },
  },
}); 