import { Injectable } from '@nestjs/common';
import { IAlbumsService } from './interfaces/albums.service.interface';
import { AlbumCreateCommand } from './commands/album-create.command';
import { Album } from '../entities/album';
import { AlbumUpdateCommand } from './commands/album-update.command';

@Injectable()
export class AlbumsService implements IAlbumsService {

    constructor() {}

    public instantiate(command: AlbumCreateCommand): Album {
        const album = new Album();
        album.setTitle(command.title);
        album.setReleaseDate(command.releaseDate);
        album.setArtistId(command.artistId);
        return album;
    }

    public update(album: Album, command: AlbumUpdateCommand): Album {
        if (command.title) {
            album.setTitle(command.title);
        }
        if (command.releaseDate) {
            album.setReleaseDate(command.releaseDate);
        }
        if (command.artistId) {
            album.setArtistId(command.artistId);
        }
        album.setUpdatedAt(new Date());
        return album;
    }
} 