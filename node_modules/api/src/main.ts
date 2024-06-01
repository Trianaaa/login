import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Configura CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Reemplaza con la URL de tu aplicación frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3002); // !important this need to be diferent to 3000 beacouse frontend is on 3000
}
bootstrap();
