import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IArtistsAppService } from '../interfaces/artists.app.service.interface';
import { IArtistsRepository } from 'src/domain/artists/repositories/artists.repository.interface';
import { Artist } from 'src/domain/artists/entities/artist';
import { Mapper } from 'src/application/shared/mapper/types';
import { CreateArtistDto } from 'src/data-transfer/artists/requests/create-artist.dto';
import { ArtistCreateCommand } from 'src/domain/artists/services/commands/artist-create.command';
import { IUnitOfWork } from 'src/domain/shared/unit-of-work.interface';
import { IArtistsService } from 'src/domain/artists/services/interfaces/artists.service.interface';
import { UpdateArtistDto } from 'src/data-transfer/artists/requests/update-artist.dto';
import { ArtistUpdateCommand } from 'src/domain/artists/services/commands/artist-update.command';

@Injectable()
export class ArtistsAppService implements IArtistsAppService {
    constructor(
        @Inject('Mapper') private readonly mapper: Mapper<any>,
        private readonly artistsRepository: IArtistsRepository,
        private readonly unitOfWork: IUnitOfWork,
        private readonly artistsService: IArtistsService,
    ) { }

    async create(createArtistDto: CreateArtistDto): Promise<void> {
        try {
            const artistByName = await this.artistsRepository.getOne({ name: createArtistDto.name });

            if (artistByName) {
                throw new Error('Artist already exists');
            }

            await this.unitOfWork.begin();

            const command = this.mapper.map<'CreateArtistDto', CreateArtistDto, 'ArtistCreateCommand', ArtistCreateCommand>(
                'CreateArtistDto',
                createArtistDto,
                'ArtistCreateCommand'
            );

            const artist = await this.artistsService.instantiate(command);

            await this.artistsRepository.create(artist);

            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }

    async findAll(): Promise<Artist[]> {
        return await this.artistsRepository.getAll();
    }

    async findOne(id: number): Promise<Artist> {
        const artist = await this.artistsRepository.getById(id);
        if (!artist) {
            throw new NotFoundException(`Artist with ID ${id} not found`);
        }
        return artist;
    }

    async update(id: number, updateArtistDto: UpdateArtistDto): Promise<void> {
        try {
            const artist = await this.findOne(id);

            await this.unitOfWork.begin();

            const command = this.mapper.map<'UpdateArtistDto', UpdateArtistDto, 'ArtistUpdateCommand', ArtistUpdateCommand>(
                'UpdateArtistDto',
                updateArtistDto,
                'ArtistUpdateCommand'
            );

            this.artistsService.update(artist, command);

            await this.artistsRepository.update(artist);

            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        try {
            await this.unitOfWork.begin();
            await this.artistsRepository.delete(id);
            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }
} 