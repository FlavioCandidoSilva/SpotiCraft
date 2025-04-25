import { Module, Provider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UnitOfWork } from './shared/unit-of-work';
import { IUnitOfWork } from 'src/domain/shared/unit-of-work.interface';
import { SongsRepository } from './songs/repositories/songs.repository';
import { ISongsRepository } from 'src/domain/songs/repositories/songs.repository.interface';
import { Song } from 'src/domain/songs/entities/song';
import { MySqlDriver } from '@mikro-orm/mysql';
import { SongSchema } from './songs/schemas/song.schema';
import { ArtistsRepository } from './artists/repositories/artists.repository';
import { IArtistsRepository } from 'src/domain/artists/repositories/artists.repository.interface';
import { AlbumsRepository } from './albums/repositories/albums.repository';
import { IAlbumsRepository } from 'src/domain/albums/repositories/albums.repository.interface';
import { PlaylistsRepository } from './playlists/repositories/playlists.repository';
import { IPlaylistsRepository } from 'src/domain/playlists/repositories/playlists.repository.interface';
import { UsersRepository } from './users/repositories/users.repository';
import { IUsersRepository } from 'src/domain/users/repositories/users.repository.interface';
import { ArtistSchema } from './artists/schemas/artist.schema';
import { AlbumSchema } from './albums/schemas/album.schema';
import { PlaylistSchema } from './playlists/schemas/playlist.schema';
import { UserSchema } from './users/schemas/user.schema';

const entities = [SongSchema, ArtistSchema, AlbumSchema, PlaylistSchema, UserSchema];

const services: Provider[] = [
  {
    provide: IUnitOfWork,
    scope: Scope.REQUEST,
    useFactory: () => {
      return new UnitOfWork();
    },
  },
  {
    provide: ISongsRepository,
    scope: Scope.REQUEST,
    useFactory: () => {
      return new SongsRepository();
    }
  },
  {
    provide: IArtistsRepository,
    scope: Scope.REQUEST,
    useFactory: () => {
      return new ArtistsRepository();
    }
  },
  {
    provide: IAlbumsRepository,
    scope: Scope.REQUEST,
    useFactory: () => {
      return new AlbumsRepository();
    }
  },
  {
    provide: IPlaylistsRepository,
    scope: Scope.REQUEST,
    useFactory: () => {
      return new PlaylistsRepository();
    }
  },
  {
    provide: IUsersRepository,
    scope: Scope.REQUEST,
    useFactory: () => {
      return new UsersRepository();
    }
  },
];

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        driver: MySqlDriver,
        allowGlobalContext: false,
        host: config.get('DEV_DB_HOST'),
        port: +config.get('DEV_DB_PORT'),
        user: config.get('DEV_DB_USERNAME'),
        password: config.get('DEV_DB_PASSWORD'),
        dbName: config.get('DEV_DB_NAME'),
        entities: entities,
        pool: {
          min: 8,
          max: 256,
        },
        debug: false,
        logger: (message) => console.log(`[MikroORM] ${message}`),
        registerRequestContext: true,
      }),
      inject: [ConfigService],
    }),
    MikroOrmModule.forFeature(entities),
  ],
  providers: [...services],
  exports: [
    MikroOrmModule, 
    IUnitOfWork, 
    ISongsRepository,
    IArtistsRepository,
    IAlbumsRepository,
    IPlaylistsRepository,
    IUsersRepository
  ],
})
export class MySQLModule {}