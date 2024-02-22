import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Public()
  @ResponseMessage('Đăng nhập thành công')
  @UseGuards(AuthGuard('local'))
  @UseGuards(ThrottlerGuard)
  @Throttle(3, 60)
  @Post('/login')
  handleLogin(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    return this.AuthService.login(req.user, res);
  }

  @Public()
  @ResponseMessage('Đăng kí thành công')
  @Post('/register')
  handleRegister(@Body() registerUserDto: CreateUserDto) {
    return this.AuthService.register(registerUserDto);
  }

  @ResponseMessage('Lấy thông tin người dùng thành công')
  @Get('/account')
  handleAccount(@Req() req: any) {
    return req.user;
  }

  @Public()
  @ResponseMessage('Lấy thông tin người dùng bằng refresh')
  @Get('/refresh')
  handlerefresh(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const refresh_token = req.cookies['refresh_token'];

    return this.AuthService.processNewToken(refresh_token, res);
  }

  @ResponseMessage('Đăng xuất thành công')
  @Post('/logout')
  handlelogout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    return this.AuthService.logout(res, user);
  }
}
