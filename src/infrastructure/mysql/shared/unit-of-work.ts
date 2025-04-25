import { EntityManager, RequestContext } from '@mikro-orm/core';
import { IUnitOfWork } from 'src/domain/shared/unit-of-work.interface';

export class UnitOfWork implements IUnitOfWork {
  private em: EntityManager;
  private isTransactionActive = false;
  
  constructor() {
    this.em = RequestContext.getEntityManager() as EntityManager;
  }

  async begin(): Promise<void> {
    await this.em.begin();
    this.isTransactionActive = true;
  }

  async commit(): Promise<void> {
    if (this.isTransactionActive) {
      await this.em.commit();
      this.isTransactionActive = false;
    }
  }

  async rollback(): Promise<void> {
    if (this.isTransactionActive) {
      await this.em.rollback();
      this.isTransactionActive = false;
    }
  }
}