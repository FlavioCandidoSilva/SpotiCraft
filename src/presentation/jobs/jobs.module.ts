import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [ApplicationModule],
  providers: [
  ],
  exports: [
  ],
})
export class JobsModule {}
