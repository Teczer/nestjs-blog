import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-3881742f-nest-teczer-444.d.aivencloud.com',
      port: 22562,
      username: 'avnadmin',
      password: 'AVNS_T0JAJ_68H0qSo8xAS2N',
      database: 'defaultdb',
      entities: [User, Post],
      synchronize: true,
    }),
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
