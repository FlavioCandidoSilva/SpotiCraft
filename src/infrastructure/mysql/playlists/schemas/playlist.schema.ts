import { EntitySchema } from '@mikro-orm/core';
import { Playlist } from 'src/domain/playlists/entities/playlist';
import { Song } from 'src/domain/songs/entities/song';
import { User } from 'src/domain/users/entities/user';

export const PlaylistSchema = new EntitySchema<Playlist>({
  class: Playlist,
  tableName: 'playlists',
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    name: { type: 'string' },
    userId: { type: 'number' },
    songs: {
      entity: () => Song,
      kind: 'm:n',
      owner: true,
      pivotTable: 'playlist_songs',
      joinColumn: 'playlist_id',
      inverseJoinColumn: 'song_id',
      lazy: true,
    },
    user: {
      entity: () => User,
      kind: 'm:1',
      ref: true,
      joinColumn: 'userId',
      inversedBy: 'playlists',
      lazy: true,
    },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date', nullable: true },
  },
}); 