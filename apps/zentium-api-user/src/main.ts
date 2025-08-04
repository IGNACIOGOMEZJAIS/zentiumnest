import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ZentiumApiUserModule } from './zentium-api-user.module';

async function bootstrap() {
  const app = await NestFactory.create(ZentiumApiUserModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBIT_URI')],
      queue: configService.get<string>('RABBIT_USER_QUEUE'),
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  // A microservice doesn't need to listen on an HTTP port unless it also serves HTTP requests
  console.log('✅ User Microservice is listening to RabbitMQ');
}
bootstrap();

