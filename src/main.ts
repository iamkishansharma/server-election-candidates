import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/tranform.interceptor';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// logging libraries: *pino*, bunion, winston
// import pino from 'pino';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3001;
  const nodeEnv = configService.get<string>('NODE_ENV') || 'local';

  app.enableCors();

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  // Optional: Add Swagger documentation
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Election Candidates')
      .setDescription('API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/v1/docs', app, document);
  }

  await app.listen(port);

  logger.log(`🚀 Application running on http://localhost:${port}/api/v1`, 'Bootstrap');
  logger.log(`📝 Environment: ${nodeEnv}`, 'Bootstrap');

  if (nodeEnv !== 'production') {
    logger.log(`📚 API Documentation: http://localhost:${port}/api/v1/docs`, 'Bootstrap');
  }
}

bootstrap().catch(console.error);
