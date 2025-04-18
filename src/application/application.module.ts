import { Module } from '@nestjs/common';
import { createMapper } from './shared/mapper/createMapper';
import { SongsService } from './songs/services/songs.service';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  providers: [
    {
      provide: 'Mapper',
      useFactory: () => {
        const mapper = createMapper();
        mapper.register([]); 
        return mapper;
      },
    },
    {
      provide: 'SongsService',
      useClass: SongsService,
    },
  ],
  exports: ['Mapper', 'SongsService'],
})
export class ApplicationModule {}
