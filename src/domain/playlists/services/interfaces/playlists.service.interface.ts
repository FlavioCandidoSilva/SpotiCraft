import { Playlist } from '../../entities/playlist';
import { PlaylistCreateCommand } from '../commands/playlist-create.command';
import { PlaylistUpdateCommand } from '../commands/playlist-update.command';

export abstract class IPlaylistsService {
  abstract instantiate(command: PlaylistCreateCommand): Playlist;
  abstract update(playlist: Playlist, command: PlaylistUpdateCommand): Playlist;
  abstract addSong(playlist: Playlist, songId: number): Playlist;
  abstract removeSong(playlist: Playlist, songId: number): Playlist;
} 