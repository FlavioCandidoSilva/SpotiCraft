import { IsArray, IsBoolean, IsDate, IsNumber, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto{
    
    @IsString()
    @ApiProperty({ description: 'The email of the user', example: 'teste@gmail.com' })
    email: string;

    @IsString()
    @ApiProperty({ description: 'The password of the user', example: '123456' })
    password: string;
}