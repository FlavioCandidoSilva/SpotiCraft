import { BaseRepository } from '../../shared/base.repository';
import { Artist } from 'src/domain/artists/entities/artist';
import { IArtistsRepository } from 'src/domain/artists/repositories/artists.repository.interface';

export class ArtistsRepository extends BaseRepository<Artist> implements IArtistsRepository {
    constructor() {
        super(Artist);
    }
} 