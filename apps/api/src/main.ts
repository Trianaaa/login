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
      ? ['https://login-client-mep6.vercel.app'] // frontend en Vercel
      : ['http://localhost:3000', 'http://localhost:3001'], // Agregamos el puerto 3001
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    optionsSuccessStatus: 200,
  });

  const port = process.env.PORT || 3002;
  // IMPORTANTE: Vincular a 0.0.0.0 para Render
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 API running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 CORS origin: ${process.env.NODE_ENV === 'production' ? 'https://login-client-mep6.vercel.app' : 'http://localhost:3000, http://localhost:3001'}`);
}
bootstrap();
