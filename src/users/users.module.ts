import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyUser } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MyUser])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
