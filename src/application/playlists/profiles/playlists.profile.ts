import { createProfile } from 'src/application/shared/mapper/createProfile';
import { CreatePlaylistDto } from 'src/data-transfer/playlists/requests/create-playlist.dto';
import { UpdatePlaylistDto } from 'src/data-transfer/playlists/requests/update-playlist.dto';
import { PlaylistCreateCommand } from 'src/domain/playlists/services/commands/playlist-create.command';
import { PlaylistUpdateCommand } from 'src/domain/playlists/services/commands/playlist-update.command';

export const createPlaylistDtoToPlaylistCreateCommand = createProfile<
  'CreatePlaylistDto',
  'PlaylistCreateCommand',
  (playlist: CreatePlaylistDto) => PlaylistCreateCommand
>(
  'CreatePlaylistDto',
  'PlaylistCreateCommand',
  (playlist: CreatePlaylistDto): PlaylistCreateCommand => ({
    name: playlist.name,
    userId: playlist.userId,
  }),
);

export const updatePlaylistDtoToPlaylistUpdateCommand = createProfile<
  'UpdatePlaylistDto',
  'PlaylistUpdateCommand',
  (playlist: UpdatePlaylistDto) => PlaylistUpdateCommand
>(
  'UpdatePlaylistDto',
  'PlaylistUpdateCommand',
  (playlist: UpdatePlaylistDto): PlaylistUpdateCommand => ({
    name: playlist.name,
  }),
); 