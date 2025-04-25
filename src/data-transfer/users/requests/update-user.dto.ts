import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty({ description: 'The username of the user', example: 'username', required: false })
  username?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: 'The email of the user', example: 'user@example.com', required: false })
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  @ApiProperty({ description: 'The password of the user', example: 'password', required: false })
  password?: string;
} 