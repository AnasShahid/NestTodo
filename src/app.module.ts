import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import orm_config from 'orm-config';

@Module({
  imports: [
    UsersModule,
    TodoModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...orm_config,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
