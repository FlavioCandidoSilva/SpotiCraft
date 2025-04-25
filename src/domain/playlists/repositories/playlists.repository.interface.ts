import { IBaseRepository } from 'src/domain/shared/base.repository.interface';
import { Playlist } from '../entities/playlist';

export abstract class IPlaylistsRepository extends IBaseRepository<Playlist> {

} 