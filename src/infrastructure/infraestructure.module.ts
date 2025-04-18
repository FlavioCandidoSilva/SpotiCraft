import { Module } from '@nestjs/common';
import { MySQLModule } from './mysql/mysql.module';


@Module({
  imports: [MySQLModule],
  exports: [MySQLModule],
})
export class InfrastructureModule {}