import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as mySqlSession from 'express-mysql-session';
import { localData } from './middlewares/localsData';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('ejs');

  const options = {
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    user: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
  };

  const mySQLStore = mySqlSession(session);
  const store = new mySQLStore(options);

  // Session
  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET') || 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: store,
    }),
  );

  app.use(localData);
  await app.listen(3000);
}

bootstrap();
