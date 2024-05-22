import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    UserModule,
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
