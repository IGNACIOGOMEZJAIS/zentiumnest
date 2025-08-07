import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZentiumApiUser } from './domain/entities/zentium_api_user.entity';
import { ZentiumApiUserController } from './presentation/zentium_api_user.controller';
import { ZentiumApiUserService } from './services/zentium_api_user.service';
import { ZentiumApiUserRepository } from './infrastructure/repositories/zentium_api_user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Set to false in production
      }),
    }),
    TypeOrmModule.forFeature([ZentiumApiUser]),
  ],
  controllers: [ZentiumApiUserController],
  providers: [ZentiumApiUserService, ZentiumApiUserRepository],
})
export class ZentiumApiUserModule {}


