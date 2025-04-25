import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ description: 'The username of the user', example: 'username' })
  username: string;

  @IsEmail()
  @ApiProperty({ description: 'The email of the user', example: 'user@example.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'The password of the user', example: 'password' })
  password: string;
} 