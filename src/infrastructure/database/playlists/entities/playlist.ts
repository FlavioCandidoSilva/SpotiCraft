import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'playlists' })
export class PlaylistEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  userId!: number;

  @Property({ type: 'json' })
  songIds: number[] = [];

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  deletedAt?: Date;
} 