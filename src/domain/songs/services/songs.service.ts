import {Injectable, NotFoundException, UnauthorizedException,} from '@nestjs/common';
import { ISongsService } from './interfaces/songs.service.interface';
import { SongCreateCommand } from './commands/song-create.command';
import { Song } from '../entities/song';
import { SongUpdateCommand } from './commands/song-update.command';
import { IArtistsRepository } from 'src/domain/artists/repositories/artists.repository.interface';
import { IAlbumsRepository } from 'src/domain/albums/repositories/albums.repository.interface';

@Injectable()
export class SongsService implements ISongsService {
    constructor(
        private readonly artistsRepository: IArtistsRepository,
        private readonly albumsRepository: IAlbumsRepository
    ) {}

    public async instantiate(command: SongCreateCommand): Promise<Song> {

        const artist = await this.artistsRepository.getById(command.artistsId);

        const album = await this.albumsRepository.getById(command.albumId);

        if (!album) {
            throw new NotFoundException(`Album with ID ${command.albumId} not found`);
        }
        
        if (!artist) {
            throw new NotFoundException(`Artist with ID ${command.artistsId} not found`);
        }

        const song = new Song();
        song.setTitle(command.title);
        song.setDuration(command.duration);
        song.setGenres(command.genres);
        song.setUrl(command.url);
        song.setExplicit(command.explicit);
        song.setReleaseDate(command.releaseDate);
        song.setArtist(artist);
        song.setAlbum(album);
        return song;
    }

    public update(song: Song, command: SongUpdateCommand): Song {
        if (command.title) {
            song.setTitle(command.title);
        }
        if (command.duration) {
            song.setDuration(command.duration);
        }
        // if (command.albumId) {
        //     song.setAlbumId(command.albumId);
        // }
        if (command.artistsId) {
            // song.setArtist(command.artistsId);
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