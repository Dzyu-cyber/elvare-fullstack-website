import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Task 5: Global prefix
  app.setGlobalPrefix('api');
  
  // Task 3: Global pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  // Task 6: Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Task 7: Global response interceptor
  app.useGlobalInterceptors(new TransformInterceptor());
  
  // Task 4: CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });
  
  // Task 8: Port 4000
  await app.listen(process.env.PORT ?? 4000);
  console.log(`Application is running on: http://localhost:4000/api`);
}
bootstrap();
