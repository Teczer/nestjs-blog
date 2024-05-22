import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as mySqlSession from 'express-mysql-session';
import { localData } from './middlewares/localsData';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('ejs');

  const options = {
    host: 'mysql-3881742f-nest-teczer-444.d.aivencloud.com',
    port: 22562,
    user: 'avnadmin',
    password: 'AVNS_T0JAJ_68H0qSo8xAS2N',
    database: 'defaultdb',
  };

  const mySQLStore = mySqlSession(session);
  const store = new mySQLStore(options);
  // Session
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: store,
    }),
  );

  app.use(localData);
  await app.listen(3000);
}
bootstrap();
