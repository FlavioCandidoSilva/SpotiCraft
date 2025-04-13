import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PresentationModule } from './presentation/presentation.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? undefined
          : process.env.NODE_ENV === 'test'
          ? '.env.test'
          : '.env.development',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PresentationModule,
  ],
})
export class AppModule {}
