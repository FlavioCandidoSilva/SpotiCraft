import { IBaseRepository } from 'src/domain/shared/base.repository.interface';
import { Song } from '../entities/song';

export abstract class ISongsRepository extends IBaseRepository<Song> {

}
