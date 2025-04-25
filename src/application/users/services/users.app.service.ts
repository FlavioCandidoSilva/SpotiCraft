import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUsersAppService } from '../interfaces/users.app.service.interface';
import { IUsersRepository } from 'src/domain/users/repositories/users.repository.interface';
import { User } from 'src/domain/users/entities/user';
import { Mapper } from 'src/application/shared/mapper/types';
import { CreateUserDto } from 'src/data-transfer/users/requests/create-user.dto';
import { UserCreateCommand } from 'src/domain/users/services/commands/user-create.command';
import { IUnitOfWork } from 'src/domain/shared/unit-of-work.interface';
import { IUsersService } from 'src/domain/users/services/interfaces/users.service.interface';
import { UpdateUserDto } from 'src/data-transfer/users/requests/update-user.dto';
import { UserUpdateCommand } from 'src/domain/users/services/commands/user-update.command';

@Injectable()
export class UsersAppService implements IUsersAppService {
    constructor(
        @Inject('Mapper') private readonly mapper: Mapper<any>,
        private readonly usersRepository: IUsersRepository,
        private readonly unitOfWork: IUnitOfWork,
        private readonly usersService: IUsersService,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<void> {
        try {
            const userByEmail = await this.usersRepository.getOne({ email: createUserDto.email });
            
            if (userByEmail) {
                throw new Error('User with this email already exists');
            }

            const userByUsername = await this.usersRepository.getOne({ username: createUserDto.username });
            if (userByUsername) {
                throw new Error('User with this username already exists');
            }

            await this.unitOfWork.begin();

            const command = this.mapper.map<'CreateUserDto', CreateUserDto, 'UserCreateCommand', UserCreateCommand>(
                'CreateUserDto',
                createUserDto,
                'UserCreateCommand'
            );

            const user = this.usersService.instantiate(command);

            await this.usersRepository.create(user);

            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.getAll();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.getById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.getOne({ email });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async findByUsername(username: string): Promise<User> {
        const user = await this.usersRepository.getOne({ username });
        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
        try {
            const user = await this.findOne(id);

            await this.unitOfWork.begin();

            const command = this.mapper.map<'UpdateUserDto', UpdateUserDto, 'UserUpdateCommand', UserUpdateCommand>(
                'UpdateUserDto',
                updateUserDto,
                'UserUpdateCommand'
            );

            this.usersService.update(user, command);

            await this.usersRepository.update(user);

            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        try {
            await this.unitOfWork.begin();
            await this.usersRepository.delete(id);
            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }
} 