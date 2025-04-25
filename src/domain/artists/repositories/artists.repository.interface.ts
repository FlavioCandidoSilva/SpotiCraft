import { IBaseRepository } from 'src/domain/shared/base.repository.interface';
import { Artist } from '../entities/artist';

export abstract class IArtistsRepository extends IBaseRepository<Artist> {

} 