import { Injectable } from '@nestjs/common';
import { IPlaylistsService } from './interfaces/playlists.service.interface';
import { PlaylistCreateCommand } from './commands/playlist-create.command';
import { Playlist } from '../entities/playlist';
import { PlaylistUpdateCommand } from './commands/playlist-update.command';
import { Song } from 'src/domain/songs/entities/song';

@Injectable()
export class PlaylistsService implements IPlaylistsService {

    constructor() {}

    public instantiate(command: PlaylistCreateCommand): Playlist {
        const playlist = new Playlist();
        playlist.setName(command.name);
        playlist.setUserId(command.userId);
        return playlist;
    }

    public update(playlist: Playlist, command: PlaylistUpdateCommand): Playlist {
        if (command.name) {
            playlist.setName(command.name);
        }
        playlist.setUpdatedAt(new Date());
        return playlist;
    }

    public addSong(playlist: Playlist, songId: number): Playlist {
        playlist.setUpdatedAt(new Date());
        return playlist;
    }

    public removeSong(playlist: Playlist, songId: number): Playlist {
        playlist.setUpdatedAt(new Date());
        return playlist;
    }
} 