import { CreateUserDto } from 'src/data-transfer/users/requests/create-user.dto';
import { UpdateUserDto } from 'src/data-transfer/users/requests/update-user.dto';
import { User } from 'src/domain/users/entities/user';

export abstract class IUsersAppService {
  abstract create(createUserDto: CreateUserDto): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: number): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByUsername(username: string): Promise<User>;
  abstract update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
  abstract remove(id: number): Promise<void>;
} 