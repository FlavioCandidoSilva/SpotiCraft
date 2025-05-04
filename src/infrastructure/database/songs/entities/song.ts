import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Album } from 'src/domain/albums/entities/album';
import { Artist } from 'src/domain/artists/entities/artist';

@Entity({ tableName: 'songs' })
export class SongEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  duration!: number;

  @ManyToOne(() => Album)
  albumId: Album;

  @ManyToOne(() => Artist)
  artistId: Artist;

  @Property({ type: 'json' })
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