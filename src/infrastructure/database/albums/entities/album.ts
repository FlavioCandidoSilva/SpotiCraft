import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'albums' })
export class AlbumEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  releaseDate!: Date;

  @Property()
  artistId!: number;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  deletedAt?: Date;
} 