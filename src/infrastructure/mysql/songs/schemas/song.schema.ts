import { EntitySchema } from '@mikro-orm/core';
import { Song } from 'src/domain/songs/entities/song';
import { Artist } from 'src/domain/artists/entities/artist';
import { Album } from 'src/domain/albums/entities/album';

export const SongSchema = new EntitySchema<Song>({
  class: Song,
  tableName: 'songs',
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    title: { type: 'string' },
    duration: { type: 'number' },
    genres: { type: 'string' },
    url: { type: 'string' },
    explicit: { type: 'boolean' },
    releaseDate: { type: 'Date', fieldName: 'release_date' },
    artist: {
      entity: () => Artist,
      kind: 'm:1',
      joinColumn: 'artists_id',
      inversedBy: 'songs',
    },
    album: {
      entity: () => Album,
      kind: 'm:1',
      joinColumn: 'album_id',
      inversedBy: 'songs',
    },
    createdAt: { type: 'Date', fieldName: 'created_at' },
    updatedAt: { type: 'Date', fieldName: 'updated_at' },
    deletedAt: { type: 'Date', fieldName: 'deleted_at', nullable: true },
  },
});