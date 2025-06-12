import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/infrastructure/redis/redis.service';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('Token não fornecido');

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload;

      const isBlacklisted = await this.redisService.get(`blacklist:${token}`);
      if (isBlacklisted) throw new UnauthorizedException('Token inválido');

      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
