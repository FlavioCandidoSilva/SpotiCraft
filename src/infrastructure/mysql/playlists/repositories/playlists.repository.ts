import { BaseRepository } from '../../shared/base.repository';
import { Playlist } from 'src/domain/playlists/entities/playlist';
import { IPlaylistsRepository } from 'src/domain/playlists/repositories/playlists.repository.interface';

export class PlaylistsRepository extends BaseRepository<Playlist> implements IPlaylistsRepository {
    constructor() {
        super(Playlist);
    }
} 