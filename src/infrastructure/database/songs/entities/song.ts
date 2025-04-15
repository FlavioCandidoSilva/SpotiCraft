import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'songs' })
export class SongEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  duration!: number;

  @Property()
  genres!: string[];

  @Property()
  url!: string;

  @Property()
  explicit!: boolean;

  @Property()
  releaseDate!: Date;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  deletedAt?: Date;
}
