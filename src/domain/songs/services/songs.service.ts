import {Injectable, NotFoundException, UnauthorizedException,} from '@nestjs/common';
import { ISongsService } from './interfaces/songs.service.interface';
import { SongCreateCommand } from './commands/song-create.command';
import { Song } from '../entities/song';

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
}