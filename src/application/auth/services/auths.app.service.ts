import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsersAppService } from 'src/application/users/interfaces/users.app.service.interface';
import { RedisService } from 'src/infrastructure/redis/redis.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly usersAppService: IUsersAppService,
  ) {}

  
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersAppService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordIsValid = await bcrypt.compare(password, user.getPassword());
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.getId(),
      email: user.getEmail(),
      username: user.getUsername(),
    };
  }

  async login(user: any) {

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    await this.redisService.set(`auth:${user.id}`, token, 3600);

    return { access_token: token };
  }

 
  async validateToken(token: string): Promise<any> {
    try {
      const decoded: any = this.jwtService.decode(token);
      const userId = decoded?.sub;

      const storedToken = await this.redisService.get(`auth:${userId}`);
      if (!storedToken || storedToken !== token) {
        throw new UnauthorizedException();
      }
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }


  async logout(userId: string) {
    await this.redisService.del(`auth:${userId}`);
  }
}
