import { Injectable } from '@nestjs/common';
import { IArtistsService } from './interfaces/artists.service.interface';
import { ArtistCreateCommand } from './commands/artist-create.command';
import { Artist } from '../entities/artist';
import { ArtistUpdateCommand } from './commands/artist-update.command';

@Injectable()
export class ArtistsService implements IArtistsService {

    constructor() {}

    public instantiate(command: ArtistCreateCommand): Artist {
        const artist = new Artist();
        artist.setName(command.name);
        artist.setGenre(command.genre);
        if (command.biography) {
            artist.setBiography(command.biography);
        }
        return artist;
    }

    public update(artist: Artist, command: ArtistUpdateCommand): Artist {
        if (command.name) {
            artist.setName(command.name);
        }
        if (command.genre) {
            artist.setGenre(command.genre);
        }
        if (command.biography !== undefined) {
            artist.setBiography(command.biography);
        }
        artist.setUpdatedAt(new Date());
        return artist;
    }
} 