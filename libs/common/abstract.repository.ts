import {
  Repository,
  FindOptionsWhere,
  DeepPartial,
} from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<T> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findOneOrFail(condition: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.repository.findOneBy(condition);
    if (!entity) {
      this.logger.warn(`Entity not found with condition: ${JSON.stringify(condition)}`);
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async update(condition: FindOptionsWhere<T>, update: DeepPartial<T>): Promise<T> {
    const entity = await this.findOneOrFail(condition);
    const merged = this.repository.merge(entity, update);
    return await this.repository.save(merged);
  }

  async delete(condition: FindOptionsWhere<T>): Promise<void> {
    const entity = await this.findOneOrFail(condition);
    await this.repository.remove(entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }
}
