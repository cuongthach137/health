import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MQTT_BROKER, PORT } from './config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

const logger = new Logger('Server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: MQTT_BROKER,
    },
  });
  app.setGlobalPrefix('/api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Dr-health API')
    .setDescription('REST API list')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  try {
    await app.listen(PORT, () => {
      logger.log(`Successfully listening on PORT: ${PORT}`);
    });
  } catch (error) {
    logger.log(`Failed to start server on PORT: ${PORT}`);
  }
}

bootstrap();
