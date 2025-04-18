import { IBaseRepository } from 'src/domain/shared/base.repository.interface';
import { Song } from '../entities/song';

export interface ISongsRepository extends IBaseRepository<Song> {
    
}
