import { Artist } from '../../entities/artist';
import { ArtistCreateCommand } from '../commands/artist-create.command';
import { ArtistUpdateCommand } from '../commands/artist-update.command';

export abstract class IArtistsService {
  abstract instantiate(command: ArtistCreateCommand): Artist;
  abstract update(artist: Artist, command: ArtistUpdateCommand): Artist;
} 