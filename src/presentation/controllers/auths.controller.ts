import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IAuthAppService } from 'src/application/auth/services/interfaces/auths.app.service.interface';
import { LoginDto } from 'src/data-transfer/auth/requests/login.dto';

@Controller('auths')
export class AuthsController {

    constructor(
        private readonly authAppService: IAuthAppService,
    ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
        return this.authAppService.login(loginDto);
    }

}