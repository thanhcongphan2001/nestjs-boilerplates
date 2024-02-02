import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from 'db/data-source';

// useFactory: (configService: ConfigService) => ({
//   type: 'postgres',
//   host: configService.get<string>('DATABASE_HOST'),
//   port: configService.get<number>('DATABASE_PORT'),
//   username: configService.get<string>('DATABASE_USERNAME'),
//   password: configService.get<string>('DATABASE_PASSWORD'),
//   database: configService.get<string>('DATABASE_NAME'),
//   entities: [User],
//   synchronize: true, // Chỉ nên sử dụng trong môi trường phát triển
// }),
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (dataSourceOptions),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/users');
  }
}
