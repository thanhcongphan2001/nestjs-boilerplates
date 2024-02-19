//@ts-nocheck

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HeheService } from './hehe.service';
import { CreateHeheDto } from './dto/create-hehe.dto';
import { UpdateHeheDto } from './dto/update-hehe.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Public } from 'src/decorator/customize';

@Controller('hehe')
export class HeheController {
  constructor(
    private readonly heheService: HeheService,
    private AuthService: AuthService,
  ) {}

  @Post()
  create(@Body() createHeheDto: CreateHeheDto) {
    return this.heheService.create(createHeheDto);
  }

  @Get()
  findAll() {
    return this.AuthService.login({ name: 'thanh cong' });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heheService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeheDto: UpdateHeheDto) {
    return this.heheService.update(+id, updateHeheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heheService.remove(+id);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  creates(@Body() createUserDto) {
    console.log(createUserDto);
    return this.AuthService.login({ name: 'hehe' });
  }
}
