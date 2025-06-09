import { Module } from '@nestjs/common';
import { MySQLModule } from './mysql/mysql.module';
import { AwsS3Module } from './aws/aws-s3.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [MySQLModule, AwsS3Module, RedisModule],
  exports: [MySQLModule, AwsS3Module, RedisModule],
})
export class InfrastructureModule {}