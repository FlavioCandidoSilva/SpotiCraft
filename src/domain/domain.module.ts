import { Module, Provider, Scope } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infraestructure.module';
import { ISongsService } from './songs/services/interfaces/songs.service.interface';
import { Song } from './songs/entities/song';
import { SongsService } from './songs/services/songs.service';
import { IArtistsService } from './artists/services/interfaces/artists.service.interface';
import { ArtistsService } from './artists/services/artists.service';
import { IAlbumsService } from './albums/services/interfaces/albums.service.interface';
import { AlbumsService } from './albums/services/albums.service';
import { IPlaylistsService } from './playlists/services/interfaces/playlists.service.interface';
import { PlaylistsService } from './playlists/services/playlists.service';
import { IUsersService } from './users/services/interfaces/users.service.interface';
import { UsersService } from './users/services/users.service';
import { IsAlpha } from 'class-validator';


const services: Provider[] = [
    {
      provide: ISongsService,
      useClass: SongsService, 
    },
    {
      provide: IArtistsService,
      useClass: ArtistsService, 
    },
    {
      provide: IAlbumsService,
      useClass: AlbumsService, 
    },
    {
      provide: IPlaylistsService,
      useClass: PlaylistsService, 
    },
    {
      provide: IUsersService,
      useClass: UsersService, 
    },
  ];
  
  @Module({
    imports: [InfrastructureModule],
    providers: [...services],
    exports: [
      InfrastructureModule,
      ISongsService,
      IArtistsService,
      IAlbumsService,
      IPlaylistsService,
      IUsersService,
    ],
  })
export class DomainModule {}
  