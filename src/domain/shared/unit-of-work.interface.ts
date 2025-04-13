export abstract class IUnitOfWork {
    abstract begin(): Promise<void>;
    abstract commit(): Promise<void>;
    abstract rollback(): Promise<void>;
}