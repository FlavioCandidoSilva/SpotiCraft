import { BaseRepository } from '../../shared/base.repository';
import { Album } from 'src/domain/albums/entities/album';
import { IAlbumsRepository } from 'src/domain/albums/repositories/albums.repository.interface';

export class AlbumsRepository extends BaseRepository<Album> implements IAlbumsRepository {
    constructor() {
        super(Album);
    }
} 