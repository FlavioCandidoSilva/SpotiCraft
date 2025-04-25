import { Injectable } from '@nestjs/common';
import { IUsersService } from './interfaces/users.service.interface';
import { UserCreateCommand } from './commands/user-create.command';
import { User } from '../entities/user';
import { UserUpdateCommand } from './commands/user-update.command';

@Injectable()
export class UsersService implements IUsersService {

    constructor() {}

    public instantiate(command: UserCreateCommand): User {
        const user = new User();
        user.setUsername(command.username);
        user.setEmail(command.email);
        user.setPassword(command.password);
        return user;
    }

    public update(user: User, command: UserUpdateCommand): User {
        if (command.username) {
            user.setUsername(command.username);
        }
        if (command.email) {
            user.setEmail(command.email);
        }
        if (command.password) {
            user.setPassword(command.password);
        }
        user.setUpdatedAt(new Date());
        return user;
    }
} 