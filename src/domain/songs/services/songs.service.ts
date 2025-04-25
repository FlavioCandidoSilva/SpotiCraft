import {Injectable, NotFoundException, UnauthorizedException,} from '@nestjs/common';
import { ISongsService } from './interfaces/songs.service.interface';
import { SongCreateCommand } from './commands/song-create.command';
import { Song } from '../entities/song';
import { SongUpdateCommand } from './commands/song-update.command';

@Injectable()
export class SongsService implements ISongsService{


    constructor(
    ) {}


    public instantiate(command: SongCreateCommand): Song {
        const song = new Song();
        song.setTitle(command.title);
        song.setDuration(command.duration);
        song.setAlbumId(command.albumId);
        song.setArtistsId(command.artistsId);
        song.setGenres(command.genres);
        song.setUrl(command.url);
        song.setExplicit(command.explicit);
        song.setReleaseDate(command.releaseDate);
        return song;
    }

    public update(song: Song, command: SongUpdateCommand): Song {
        if (command.title) {
            song.setTitle(command.title);
        }
        if (command.duration) {
            song.setDuration(command.duration);
        }
        if (command.albumId) {
            song.setAlbumId(command.albumId);
        }
        if (command.artistsId) {
            song.setArtistsId(command.artistsId);
        }
        if (command.genres) {
            song.setGenres(command.genres);
        }
        if (command.url) {
            song.setUrl(command.url);
        }
        if (command.explicit !== undefined) {
            song.setExplicit(command.explicit);
        }
        if (command.releaseDate) {
            song.setReleaseDate(command.releaseDate);
        }
        song.setUpdatedAt(new Date());
        return song;
    }
}