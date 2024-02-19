import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username, password): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log('xem', user);

    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('hehe', username, password);

    return username;
  }
}
