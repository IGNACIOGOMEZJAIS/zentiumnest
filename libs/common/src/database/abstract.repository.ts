import { AbstractEntity } from './abstract.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<
  T extends AbstractEntity<T>,
> {
  protected readonly entityManager: EntityManager;

  constructor(
    private readonly entityRepository: Repository<T>,
    entityManager: EntityManager,
  ) {
    this.entityManager = entityManager;
  }

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.entityRepository.findOne({ where });
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    const updateResult = await this.entityRepository.update(where, partialEntity);

    if (!updateResult.affected) {
      // You can throw an exception here if the entity is not found
      return null;
    }

    return this.findOne(where);
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.find({ where });
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    return this.entityRepository.delete(where);
  }
}
