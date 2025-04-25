import { IBaseRepository } from 'src/domain/shared/base.repository.interface';
import { Album } from '../entities/album';

export abstract class IAlbumsRepository extends IBaseRepository<Album> {

} 