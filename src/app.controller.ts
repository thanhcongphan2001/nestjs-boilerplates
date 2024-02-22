import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthService } from './auth/auth.service';

@Controller() //  route /
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
}
