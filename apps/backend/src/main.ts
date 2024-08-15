import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './app/config/types';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger);
  const configService = app.get(ConfigService<AppConfig, true>);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT'));
  logger.log(`Listening on port ${configService.get('PORT')}`);
}
bootstrap();
