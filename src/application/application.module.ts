import { Module, Provider } from '@nestjs/common';
import { createMapper } from './shared/mapper/createMapper';
import { DomainModule } from 'src/domain/domain.module';
import { createSongDtoToSongCreateCommand } from './songs/profiles/songs.profile';
import { SongsAppService } from './songs/services/songs.service';
import { ISongsAppService } from '../application/songs/interfaces/songs.app.service.interface'

const services: Provider[] = [
  {
    provide:  ISongsAppService,
    useClass: SongsAppService,
  }
]

const profiles = [
  createSongDtoToSongCreateCommand,
]

@Module({
  imports: [DomainModule],
  providers: [
    {
      provide: 'Mapper',
      useFactory: () => {
        const mapper = createMapper();
        mapper.register(profiles); 
        return mapper;
      },
    },
    ...services,
  ],
  exports: ['Mapper', ISongsAppService],
})
export class ApplicationModule {}
