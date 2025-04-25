import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPlaylistsAppService } from '../interfaces/playlists.app.service.interface';
import { IPlaylistsRepository } from 'src/domain/playlists/repositories/playlists.repository.interface';
import { Playlist } from 'src/domain/playlists/entities/playlist';
import { Mapper } from 'src/application/shared/mapper/types';
import { CreatePlaylistDto } from 'src/data-transfer/playlists/requests/create-playlist.dto';
import { PlaylistCreateCommand } from 'src/domain/playlists/services/commands/playlist-create.command';
import { IUnitOfWork } from 'src/domain/shared/unit-of-work.interface';
import { IPlaylistsService } from 'src/domain/playlists/services/interfaces/playlists.service.interface';
import { UpdatePlaylistDto } from 'src/data-transfer/playlists/requests/update-playlist.dto';
import { PlaylistUpdateCommand } from 'src/domain/playlists/services/commands/playlist-update.command';
import { ISongsRepository } from 'src/domain/songs/repositories/songs.repository.interface';

@Injectable()
export class PlaylistsAppService implements IPlaylistsAppService {
    constructor(
        @Inject('Mapper') private readonly mapper: Mapper<any>,
        private readonly playlistsRepository: IPlaylistsRepository,
        private readonly songsRepository: ISongsRepository,
        private readonly unitOfWork: IUnitOfWork,
        private readonly playlistsService: IPlaylistsService,
    ) { }

    async create(createPlaylistDto: CreatePlaylistDto): Promise<void> {
        try {
            await this.unitOfWork.begin();

            const command = this.mapper.map<'CreatePlaylistDto', CreatePlaylistDto, 'PlaylistCreateCommand', PlaylistCreateCommand>(
                'CreatePlaylistDto',
                createPlaylistDto,
                'PlaylistCreateCommand'
            );

            const playlist = await this.playlistsService.instantiate(command);

            await this.playlistsRepository.create(playlist);

            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }

    async findAll(): Promise<Playlist[]> {
        return await this.playlistsRepository.getAll();
    }

    async findOne(id: number): Promise<Playlist> {
        const playlist = await this.playlistsRepository.getById(id);
        if (!playlist) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        }
        return playlist;
    }

    async update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<void> {
        try {
            const playlist = await this.findOne(id);

            await this.unitOfWork.begin();

            const command = this.mapper.map<'UpdatePlaylistDto', UpdatePlaylistDto, 'PlaylistUpdateCommand', PlaylistUpdateCommand>(
                'UpdatePlaylistDto',
                updatePlaylistDto,
                'PlaylistUpdateCommand'
            );

            this.playlistsService.update(playlist, command);

            await this.playlistsRepository.update(playlist);

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
            await this.playlistsRepository.delete(id);
            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }

    async addSong(id: number, songId: number): Promise<void> {
        try {
            const playlist = await this.findOne(id);
            const song = await this.songsRepository.getById(songId);
            
            if (!song) {
                throw new NotFoundException(`Song with ID ${songId} not found`);
            }

            await this.unitOfWork.begin();
            
            playlist.getSongs().add(song);
            
            await this.playlistsRepository.update(playlist);
            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }

    async removeSong(id: number, songId: number): Promise<void> {
        try {
            const playlist = await this.findOne(id);
            const song = await this.songsRepository.getById(songId);
            
            if (!song) {
                throw new NotFoundException(`Song with ID ${songId} not found`);
            }

            await this.unitOfWork.begin();
            
            playlist.getSongs().remove(song);
            
            await this.playlistsRepository.update(playlist);
            await this.unitOfWork.commit();
        } catch (error) {
            await this.unitOfWork.rollback();
            throw new Error(error.message);
        }
    }
} 