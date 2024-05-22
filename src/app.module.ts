import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:savina@localhost:5432/test_task',
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: false,
      logging: false,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/**/migrations/*{.js,.ts}`],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
