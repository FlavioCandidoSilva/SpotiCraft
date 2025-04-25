import { IBaseRepository } from 'src/domain/shared/base.repository.interface';
import { User } from '../entities/user';

export abstract class IUsersRepository extends IBaseRepository<User> {
} 