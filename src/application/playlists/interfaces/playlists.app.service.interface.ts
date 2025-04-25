import { CreatePlaylistDto } from 'src/data-transfer/playlists/requests/create-playlist.dto';
import { UpdatePlaylistDto } from 'src/data-transfer/playlists/requests/update-playlist.dto';
import { Playlist } from 'src/domain/playlists/entities/playlist';

export abstract class IPlaylistsAppService {
  abstract create(createPlaylistDto: CreatePlaylistDto): Promise<void>;
  abstract findAll(): Promise<Playlist[]>;
  abstract findOne(id: number): Promise<Playlist>;
  abstract update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<void>;
  abstract remove(id: number): Promise<void>;
  abstract addSong(id: number, songId: number): Promise<void>;
  abstract removeSong(id: number, songId: number): Promise<void>;
} 