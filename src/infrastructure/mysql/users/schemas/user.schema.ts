import { EntitySchema } from '@mikro-orm/core';
import { User } from 'src/domain/users/entities/user';
import { Playlist } from 'src/domain/playlists/entities/playlist';

export const UserSchema = new EntitySchema<User>({
  class: User,
  tableName: 'users',
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    username: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    playlists: {
      entity: () => Playlist,
      kind: '1:m',
      mappedBy: (playlist) => playlist.user,
      orphanRemoval: true,
      lazy: true,
    },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date', nullable: true },
  },
}); 