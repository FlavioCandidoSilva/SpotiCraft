import { Module } from '@nestjs/common';
import { MySQLModule } from './mysql/mysql.module';
import { AwsS3Module } from './aws/aws-s3.module';

@Module({
  imports: [MySQLModule, AwsS3Module],
  exports: [MySQLModule, AwsS3Module],
})
export class InfrastructureModule {}