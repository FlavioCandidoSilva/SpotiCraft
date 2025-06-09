// src/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthAppService) {
    super({ usernameField: 'email' }); 
  }

  async validate(email: string, password: string): Promise<any> {
    return this.authService.validateUser(email, password);
  }
}
