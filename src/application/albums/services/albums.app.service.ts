import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAlbumsAppService } from '../interfaces/albums.app.service.interface';
import { IAlbumsRepository } from 'src/domain/albums/repositories/albums.repository.interface';
import { Album } from 'src/domain/albums/entities/album';
import { Mapper } from 'src/application/shared/mapper/types';
import { CreateAlbumDto } from 'src/data-transfer/albums/requests/create-album.dto';
import { AlbumCreateCommand } from 'src/domain/albums/services/commands/album-create.command';
import { IUnitOfWork } from 'src/domain/shared/unit-of-work.interface';
import { IAlbumsService } from 'src/domain/albums/services/interfaces/albums.service.interface';
import { UpdateAlbumDto } from 'src/data-transfer/albums/requests/update-album.dto';
import { AlbumUpdateCommand } from 'src/domain/albums/services/commands/album-update.command';

@Injectable()
export class AlbumsAppService implements IAlbumsAppService {
    constructor(
        @Inject('Mapper') private readonly mapper: Mapper<any>,
        private readonly albumsRepository: IAlbumsRepository,
        private readonly unitOfWork: IUnitOfWork,
        private readonly albumsService: IAlbumsService,
    ) { }

    async create(createAlbumDto: CreateAlbumDto): Promise<void> {
        try {
            const albumByTitle = await this.albumsRepository.getOne({ title: createAlbumDto.title, artistId: createAlbumDto.artistId });

            if (albumByTitle) {
                throw new Error('Album already exists');
            }

            await this.unitOfWork.begin();

            const command = this.mapper.map<'CreateAlbumDto', CreateAlbumDto, 'AlbumCreateCommand', AlbumCreateCommand>(
                'CreateAlbumDto',
                createAlbumDto,
                'AlbumCreateCommand'
            );

            const album = await this.albumsService.instantiate(command);

            await this.albumsRepository.create(album);

            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }

    async findAll(): Promise<Album[]> {
        return await this.albumsRepository.getAll();
    }

    async findOne(id: number): Promise<Album> {
        const album = await this.albumsRepository.getById(id);
        if (!album) {
            throw new NotFoundException(`Album with ID ${id} not found`);
        }
        return album;
    }

    async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<void> {
        try {
            const album = await this.findOne(id);

            await this.unitOfWork.begin();

            const command = this.mapper.map<'UpdateAlbumDto', UpdateAlbumDto, 'AlbumUpdateCommand', AlbumUpdateCommand>(
                'UpdateAlbumDto',
                updateAlbumDto,
                'AlbumUpdateCommand'
            );

            this.albumsService.update(album, command);

            await this.albumsRepository.update(album);

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
            await this.albumsRepository.delete(id);
            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }
} 