import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IUsersAppService } from 'src/application/users/interfaces/users.app.service.interface';
import { CreateUserDto } from 'src/data-transfer/users/requests/create-user.dto';
import { UpdateUserDto } from 'src/data-transfer/users/requests/update-user.dto';
import { User } from 'src/domain/users/entities/user';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersAppService: IUsersAppService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersAppService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersAppService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersAppService.findOne(+id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.usersAppService.findByEmail(email);
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    return this.usersAppService.findByUsername(username);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    return this.usersAppService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersAppService.remove(+id);
  }
} 