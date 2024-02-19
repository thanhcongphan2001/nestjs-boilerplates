import { Module } from '@nestjs/common';
import { HeheService } from './hehe.service';
import { HeheController } from './hehe.controller';
import { Hehe } from './entities/hehe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hehe]), AuthModule],
  controllers: [HeheController],
  providers: [HeheService],
})
export class HeheModule {}
