import { EntitySchema } from '@mikro-orm/core';
import { Album } from 'src/domain/albums/entities/album';
import { Song } from 'src/domain/songs/entities/song';

export const AlbumSchema = new EntitySchema<Album>({
  class: Album,
  tableName: 'albums',
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    title: { type: 'string' },
    releaseDate: { type: 'Date' },
    artistId: { type: 'number' },
    songs: {
      entity: () => Song,
      kind: '1:m',
      mappedBy: (song) => song.album,
      orphanRemoval: true,
      lazy: true,
    },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date', nullable: true },
  },
}); 