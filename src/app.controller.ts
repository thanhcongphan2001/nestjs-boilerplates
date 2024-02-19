import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller() //  route /
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Post('login')
  // @AuthGuard(LocalAuthGuard)
  creates(@Body() createUserDto) {
    console.log(createUserDto);
    return this.authService.login({ name: 'thanh cong' });
  }
}
