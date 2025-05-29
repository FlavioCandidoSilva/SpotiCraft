import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ArtistEntity } from '../../artists/entities/artist';
import { AlbumEntity } from '../../albums/entities/album';

@Entity({ tableName: 'songs' })
export class SongEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  duration!: number;

  @ManyToOne(() => AlbumEntity)
  albumId: AlbumEntity;

  @ManyToOne(() => ArtistEntity)
  artistId: ArtistEntity;

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