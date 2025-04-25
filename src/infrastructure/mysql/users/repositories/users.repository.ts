import { BaseRepository } from '../../shared/base.repository';
import { User } from 'src/domain/users/entities/user';
import { IUsersRepository } from 'src/domain/users/repositories/users.repository.interface';

export class UsersRepository extends BaseRepository<User> implements IUsersRepository {
    constructor() {
        super(User);
    }
} 