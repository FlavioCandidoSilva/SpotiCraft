import { Module, Provider } from '@nestjs/common';
import { createMapper } from './shared/mapper/createMapper';
import { DomainModule } from 'src/domain/domain.module';
import { createSongDtoToSongCreateCommand, updateSongDtoToSongUpdateCommand } from './songs/profiles/songs.profile';
import { SongsAppService } from './songs/services/songs.app.service';
import { ISongsAppService } from './songs/interfaces/songs.app.service.interface';
import { ArtistsAppService } from './artists/services/artists.app.service';
import { IArtistsAppService } from './artists/interfaces/artists.app.service.interface';
import { AlbumsAppService } from './albums/services/albums.app.service';
import { IAlbumsAppService } from './albums/interfaces/albums.app.service.interface';
import { PlaylistsAppService } from './playlists/services/playlists.app.service';
import { IPlaylistsAppService } from './playlists/interfaces/playlists.app.service.interface';
import { UsersAppService } from './users/services/users.app.service';
import { IUsersAppService } from './users/interfaces/users.app.service.interface';
import { createArtistDtoToArtistCreateCommand, updateArtistDtoToArtistUpdateCommand } from './artists/profiles/artists.profile';
import { createAlbumDtoToAlbumCreateCommand, updateAlbumDtoToAlbumUpdateCommand } from './albums/profiles/albums.profile';
import { createPlaylistDtoToPlaylistCreateCommand, updatePlaylistDtoToPlaylistUpdateCommand } from './playlists/profiles/playlists.profile';
import { createUserDtoToUserCreateCommand, updateUserDtoToUserUpdateCommand } from './users/profiles/users.profile';

const services: Provider[] = [
  {
    provide: ISongsAppService,
    useClass: SongsAppService,
  },
  {
    provide: IArtistsAppService,
    useClass: ArtistsAppService,
  },
  {
    provide: IAlbumsAppService,
    useClass: AlbumsAppService,
  },
  {
    provide: IPlaylistsAppService,
    useClass: PlaylistsAppService,
  },
  {
    provide: IUsersAppService,
    useClass: UsersAppService,
  }
]

const profiles = [
  createSongDtoToSongCreateCommand,
  updateSongDtoToSongUpdateCommand,
  createArtistDtoToArtistCreateCommand,
  updateArtistDtoToArtistUpdateCommand,
  createAlbumDtoToAlbumCreateCommand,
  updateAlbumDtoToAlbumUpdateCommand,
  createPlaylistDtoToPlaylistCreateCommand,
  updatePlaylistDtoToPlaylistUpdateCommand,
  createUserDtoToUserCreateCommand,
  updateUserDtoToUserUpdateCommand,
]

@Module({
  imports: [DomainModule],
  providers: [
    {
      provide: 'Mapper',
      useFactory: () => {
        const mapper = createMapper();
        mapper.register(profiles); 
        return mapper;
      },
    },
    ...services,
  ],
  exports: [
    'Mapper', 
    ISongsAppService, 
    IArtistsAppService, 
    IAlbumsAppService, 
    IPlaylistsAppService, 
    IUsersAppService
  ],
})
export class ApplicationModule {}
