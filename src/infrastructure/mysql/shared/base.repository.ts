import {
  EntityRepository,
  EntityManager,
  AnyEntity,
  FilterQuery,
  FindOptions,
  RequestContext,
  EntityData,
  UpsertOptions,
} from '@mikro-orm/core';
import { QueryBuilder } from '@mikro-orm/mysql';
import { IBaseRepository } from 'src/domain/shared/base.repository.interface';
import { PaginationQuery } from 'src/domain/pagination-query/entities/pagination-query';
import { OrderTypeEnum } from 'src/application/data-transfer/shared/filters/enums/order-type.enum';

export class BaseRepository<TDomain extends object = AnyEntity>
  implements IBaseRepository<TDomain>
{
  protected get em(): EntityManager {
    return RequestContext.getEntityManager() as EntityManager;
  }

  protected get repository(): EntityRepository<TDomain> {
    return this.em.getRepository<TDomain>(this.entityClass);
  }

  constructor(
    private readonly entityClass: { new (...args: any[]): TDomain },
  ) {}

  async create(data: TDomain): Promise<TDomain> {
    const entity = this.repository.create(data);
    this.em.persist(entity);
    return entity;
  }

  async update(entity: TDomain): Promise<TDomain> {
    this.em.persist(entity);
    return entity;
  }

  async getById(id: number): Promise<TDomain | null> {
    return await this.repository.findOne({ id } as FilterQuery<TDomain>);
  }

  async getAll(): Promise<TDomain[]> {
    return await this.repository.findAll();
  }

  async getOne(
    filter: FilterQuery<TDomain>,
    popArray?: string[],
  ): Promise<TDomain | null> {
    return await this.repository.findOne(filter, {
      populate: popArray as never,
    });
  }

  async getMany(filter: FilterQuery<TDomain>): Promise<TDomain[]> {
    return await this.repository.find(filter);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.repository.findOne({
      id,
    } as FilterQuery<TDomain>);
    if (!entity) {
      throw new Error('Entity not found');
    }
    this.em.remove(entity);
  }

  async deleteMany(): Promise<void> {
    const entities = await this.repository.findAll();
    if (!entities) {
      throw new Error('Entities not found');
    }
    this.em.remove(entities);
  }

  query(alias: string): QueryBuilder<TDomain> {
    return this.em.getRepository(this.entityClass).createQueryBuilder(alias);
  }

  async findAndCount(
    filter?: FilterQuery<TDomain>,
    options?: FindOptions<TDomain>,
  ): Promise<[TDomain[], number]> {
    return await this.em
      .getRepository(this.entityClass)
      .findAndCount(filter, options);
  }

  async list(
    query: QueryBuilder<TDomain>,
    quantity: number,
    page: number,
    orderField: string,
    orderType: OrderTypeEnum
  ): Promise<PaginationQuery<TDomain>> {
    const offset = (page - 1) * quantity;
    const totalItems = await query.clone().count();
    const data = await query
      .orderBy({ [orderField]: OrderTypeEnum[orderType] })
      .limit(quantity)
      .offset(offset)
      .getResultList();

    const totalPages = Math.ceil(totalItems / quantity);

    return new PaginationQuery<TDomain>(
      totalItems,
      totalPages,
      +page,
      +quantity,
      data,
    );
  }
}
