import { NestFactory } from '@nestjs/core';
import * as express from 'express'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/ImagesMulter',express.static('ImagesMulter'))
  await app.listen(3000);
}
bootstrap();
