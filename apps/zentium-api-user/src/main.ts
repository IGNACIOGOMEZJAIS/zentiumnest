import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZentiumApiUserModule } from './zentium-api-user.module';

async function bootstrap() {
  const app = await NestFactory.create(ZentiumApiUserModule);
  const configService = app.get(ConfigService);

  // Microservicio RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBIT_URI')],
      queue: configService.get<string>('RABBIT_USER_QUEUE'),
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  console.log('✅ User Microservice is listening to RabbitMQ');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API para gestión de usuarios')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:PORT/api

  // HTTP Server
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  console.log(` HTTP server running on: http://localhost:${port}`);
  console.log(` Swagger docs available at: http://localhost:${port}/api`);
}

bootstrap();
