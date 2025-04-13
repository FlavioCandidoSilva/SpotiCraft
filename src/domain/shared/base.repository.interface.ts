import { AnyEntity, EntityData, FilterQuery, FindOptions, Populate, UpsertOptions } from "@mikro-orm/core";
import { QueryBuilder } from "@mikro-orm/mysql";
import { PaginationQuery } from "../pagination-query/entities/pagination-query";
import { OrderTypeEnum } from "src/application/data-transfer/shared/filters/enums/order-type.enum";

export abstract class IBaseRepository<TDomain extends object = AnyEntity> {
  abstract create(data: TDomain): Promise<TDomain>;
  abstract update(entity: TDomain): Promise<TDomain>;
  abstract getById(id: number): Promise<TDomain | null>;
  abstract getAll(): Promise<TDomain[]>;
  abstract getOne(filter: FilterQuery<TDomain>, popArray?: string[]): Promise<TDomain | null>;
  abstract getMany(filter: FilterQuery<TDomain>): Promise<TDomain[]>;
  abstract delete(id: number): Promise<void>;
  abstract deleteMany(): Promise<void>;
  abstract query(alias: string): QueryBuilder<TDomain>;
  abstract findAndCount(filter?: FilterQuery<TDomain>,options?: FindOptions<TDomain>): Promise<[TDomain[], number]>;
  abstract list(query: QueryBuilder<TDomain>, quantity: number, page: number, orderField: string, orderType: OrderTypeEnum): Promise<PaginationQuery<TDomain>>;
}