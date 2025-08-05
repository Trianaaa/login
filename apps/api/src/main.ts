import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Seguridad básica
  app.use(helmet());
  app.use(compression());

  // Validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configuración CORS más restrictiva
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://tu-dominio-frontend.com'] // Reemplaza con tu dominio real
      : ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    optionsSuccessStatus: 200,
  });

  const port = process.env.PORT || 3002;
  await app.listen(port);
  
  console.log(`🚀 API running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
}
bootstrap();
