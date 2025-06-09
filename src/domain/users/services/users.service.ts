import { Injectable } from '@nestjs/common';
import { IUsersService } from './interfaces/users.service.interface';
import { UserCreateCommand } from './commands/user-create.command';
import { User } from '../entities/user';
import { UserUpdateCommand } from './commands/user-update.command';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements IUsersService {

    constructor() {}

    public instantiate(command: UserCreateCommand): User {
        const user = new User();
        user.setUsername(command.username);
        user.setEmail(command.email);
        this.verifyPassword(command);
        const hashedPassword = bcrypt.hashSync(command.password, 10);
        user.setPassword(hashedPassword);
        return user;
    }

    public verifyPassword(command): boolean {
        if(command.password !== command.confirmPassword) {
            throw new Error('Passwords do not match');
        }
        return true;
    }

    public update(user: User, command: UserUpdateCommand): User {
        if (command.username) {
            user.setUsername(command.username);
        }
        if (command.email) {
            user.setEmail(command.email);
        }
        if (command.password) {
            this.verifyPassword(command);
            const hashedPassword = bcrypt.hashSync(command.password, 10);
            user.setPassword(hashedPassword);
        }
        user.setUpdatedAt(new Date());
        return user;
    }
} 