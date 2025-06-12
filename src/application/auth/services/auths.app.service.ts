import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsersAppService } from 'src/application/users/interfaces/users.app.service.interface';
import { RedisService } from 'src/infrastructure/redis/redis.service';
import { IAuthAppService } from './interfaces/auths.app.service.interface';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/data-transfer/auth/requests/login.dto';

@Injectable()
export class AuthsAppService implements IAuthAppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly usersAppService: IUsersAppService,
  ) { }


  async login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {

    const user = await this.usersAppService.findByEmail(loginDto.email);

    if (!user || !(await bcrypt.compare(loginDto.password, user.getPassword()))) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = { sub: user.getId(), email: user.getEmail() };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.redisService.set(`refresh:${user.getId()}`, refreshToken, 7 * 24 * 60 * 60);

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(userId: number, token: string): Promise<boolean> {
    const storedToken = await this.redisService.get(`refresh:${userId}`);
    return storedToken === token;
  }

  async logout(userId: number) {
    await this.redisService.del(`refresh:${userId}`);
  }
}
