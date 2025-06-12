import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { ApplicationModule } from 'src/application/application.module';
import { ArtistsController } from './artists.controller';
import { AlbumsController } from './albums.controller';
import { PlaylistsController } from './playlists.controller';
import { UsersController } from './users.controller';
import { AuthsController } from './auths.controller';

@Module({
  controllers: [
    SongsController,
    ArtistsController,
    AlbumsController,
    PlaylistsController,
    UsersController,
    AuthsController

  ],
  imports: [ApplicationModule],
})
export class ControllersModule {}
