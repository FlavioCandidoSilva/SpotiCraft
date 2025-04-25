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
    albumId: { type: 'number' },
    artistsId: { type: 'number' },
    genres: { type: 'string' },
    url: { type: 'string' },
    explicit: { type: 'boolean' },
    releaseDate: { type: 'Date' },
    artist: {
      entity: () => Artist,
      kind: 'm:1',
      ref: true,
      joinColumn: 'artistsId',
      inversedBy: 'songs',
      lazy: true,
    },
    album: {
      entity: () => Album,
      kind: 'm:1',
      ref: true,
      joinColumn: 'albumId',
      inversedBy: 'songs',
      lazy: true,
    },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date', nullable: true },
  },
});