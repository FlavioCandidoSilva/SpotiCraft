import { EntityManager, RequestContext } from '@mikro-orm/core';
import { IUnitOfWork } from 'src/domain/shared/unit-of-work.interface';

export class UnitOfWork implements IUnitOfWork {
  private em: EntityManager;
  
  constructor() {
    this.em = RequestContext.getEntityManager() as EntityManager;
  }

  async begin(): Promise<void> {
    await this.em.begin();
  }

  async commit(): Promise<void> {
    await this.em.commit();
  }

  async rollback(): Promise<void> {
    await this.em.rollback();
  }
}