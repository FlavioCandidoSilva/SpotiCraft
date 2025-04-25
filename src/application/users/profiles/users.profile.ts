import { createProfile } from 'src/application/shared/mapper/createProfile';
import { CreateUserDto } from 'src/data-transfer/users/requests/create-user.dto';
import { UpdateUserDto } from 'src/data-transfer/users/requests/update-user.dto';
import { UserCreateCommand } from 'src/domain/users/services/commands/user-create.command';
import { UserUpdateCommand } from 'src/domain/users/services/commands/user-update.command';

export const createUserDtoToUserCreateCommand = createProfile<
  'CreateUserDto',
  'UserCreateCommand',
  (user: CreateUserDto) => UserCreateCommand
>(
  'CreateUserDto',
  'UserCreateCommand',
  (user: CreateUserDto): UserCreateCommand => ({
    username: user.username,
    email: user.email,
    password: user.password,
  }),
);

export const updateUserDtoToUserUpdateCommand = createProfile<
  'UpdateUserDto',
  'UserUpdateCommand',
  (user: UpdateUserDto) => UserUpdateCommand
>(
  'UpdateUserDto',
  'UserUpdateCommand',
  (user: UpdateUserDto): UserUpdateCommand => ({
    username: user.username,
    email: user.email,
    password: user.password,
  }),
); 