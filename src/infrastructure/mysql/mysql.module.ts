import { Module, Provider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UnitOfWork } from './shared/unit-of-work';
import { MySqlDriver } from '@mikro-orm/mysql';
import { IUnitOfWork } from 'src/domain/shared/unit-of-work.interface';

const entities = [];

const services: Provider[] = [
  {
    provide: IUnitOfWork,
    scope: Scope.REQUEST,
    useFactory: () => {
      return new UnitOfWork();
    },
  },
];

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        driver: MySqlDriver,
        allowGlobalContext: false,
        host: config.get('DEV_DB_HOST'),
        port: +config.get('DEV_DB_PORT'),
        user: config.get('DEV_DB_USERNAME'),
        password: config.get('DEV_DB_PASSWORD'),
        dbName: config.get('DEV_DB_NAME'),
        entities: entities,
        pool: {
          min: 8,
          max: 256,
        },
        debug: false,
        logger: (message) => console.log(`[MikroORM] ${message}`),
        registerRequestContext: true,
      }),
      inject: [ConfigService],
    }),
    MikroOrmModule.forFeature(entities),
  ],
  providers: [...services],
  exports: [MikroOrmModule, IUnitOfWork],
})
export class MySQLModule {}