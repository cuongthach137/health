import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MQTT_BROKER, PORT } from './config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
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
    app.connectMicroservice({
      transport: Transport.MQTT,
      options: {
        url: MQTT_BROKER,
      },
    });
    await app.listen(PORT, () => {
      console.log(`Successfully listening on PORT: ${PORT}`);
      console.log(MQTT_BROKER);
    });
  } catch (error) {
    console.log(`Failed to start server on PORT: ${PORT}`);
  }
}

bootstrap();
