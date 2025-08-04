import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ZentiumApiUser } from '../../domain/entities/zentium-api-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ZentiumApiUserRepository extends AbstractRepository<ZentiumApiUser> {
  protected readonly logger = new Logger(ZentiumApiUserRepository.name);

  constructor(
    @InjectRepository(ZentiumApiUser)
    zentiumApiUserRepository: Repository<ZentiumApiUser>,
    entityManager: EntityManager,
  ) {
    super(zentiumApiUserRepository, entityManager);
  }
}
