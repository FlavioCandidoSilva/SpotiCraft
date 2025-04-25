import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'artists' })
export class ArtistEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  genre!: string;

  @Property({ nullable: true })
  biography?: string;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  deletedAt?: Date;
} 