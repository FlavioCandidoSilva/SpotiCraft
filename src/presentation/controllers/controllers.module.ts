import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [
    ApplicationModule,
    JobsModule
  ],
  controllers: [],
})
export class ControllersModule {}
