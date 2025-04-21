import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { JobsModule } from '../jobs/jobs.module';
import { SongsController } from './songs.controller';

@Module({
  imports: [
    ApplicationModule,
    JobsModule
  ],
  controllers: [SongsController],
})
export class ControllersModule {}
