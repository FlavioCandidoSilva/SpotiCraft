import { User } from '../../entities/user';
import { UserCreateCommand } from '../commands/user-create.command';
import { UserUpdateCommand } from '../commands/user-update.command';

export abstract class IUsersService {
  abstract instantiate(command: UserCreateCommand): User;
  abstract update(user: User, command: UserUpdateCommand): User;
} 