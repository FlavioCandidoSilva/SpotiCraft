import { Module, Provider } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infraestructure.module';
import { ISongsService } from './songs/services/interfaces/songs.service.interface';
import { Song } from './songs/entities/song';
import { SongsService } from './songs/services/songs.service';
import { IsAlpha } from 'class-validator';


const services: Provider[] = [
    {
        provide: ISongsService,
        useClass: SongsService,
    },
];

@Module({
    imports: [InfrastructureModule],
    providers: [...services],
    exports: [
        InfrastructureModule,
        ISongsService,
    ],
})
export class DomainModule { }