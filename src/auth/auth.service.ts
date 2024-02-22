import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as ms from 'ms';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // ussername/ pass là 2 tham số thư viện passport nó ném về
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);

    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  }

  async login(user: any, res) {
    const payload = { ...user };
    delete payload.password;
    delete payload.refresh_token;

    const refresh_token = await this.createRefreshToken(payload);
    await this.usersService.updateUserToken(refresh_token, payload.id);
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
    });
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      user: payload,
    };
  }

  async register(user: any) {
    const newUser = await this.usersService.register(user);
    return {
      email: newUser?.email,
    };
  }

  async processNewToken(refreshToken: string, res) {
    try {
      const data = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      });

      const user = await this.usersService.findUserByToken(refreshToken);
      if (user) {
        const { id, name, email } = user;
        const payload = {
          id,
          name,
          email,
        };
        const refresh_token = await this.createRefreshToken(payload);
        const access_token = this.jwtService.sign(payload);
        await this.usersService.updateUserToken(refresh_token, id);

        res.clearCookie('refresh_token');
        res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
        });
        return {
          access_token,
          user: {
            id,
            name,
            email,
          },
        };
      } else {
        throw new BadRequestException('refreshtoken không hợp lệ');
      }
    } catch (error) {
      throw new BadRequestException('refreshtoken không hợp lệ');
    }
  }

  async createRefreshToken(payload) {
    const refresh_token = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });
    return refresh_token;
  }

  async logout(res, user) {
    await this.usersService.updateUserToken('', user.id);
    res.clearCookie('refresh_token');
    return 'ok';
  }
}
