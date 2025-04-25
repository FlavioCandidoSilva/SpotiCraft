import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISongsRepository } from 'src/domain/songs/repositories/songs.repository.interface';
import { Song } from 'src/domain/songs/entities/song';
import { Mapper } from 'src/application/shared/mapper/types';
import { CreateSongDto } from 'src/data-transfer/songs/requests/create-song.dto';
import { SongCreateCommand } from 'src/domain/songs/services/commands/song-create.command';
import { IUnitOfWork } from 'src/domain/shared/unit-of-work.interface';
import { ISongsAppService } from '../interfaces/songs.app.service.interface';
import { ISongsService } from 'src/domain/songs/services/interfaces/songs.service.interface';
import { UpdateSongDto } from 'src/data-transfer/songs/requests/update-song.dto';
import { SongUpdateCommand } from 'src/domain/songs/services/commands/song-update.command';

@Injectable()
export class SongsAppService implements ISongsAppService {
  constructor(
    @Inject('Mapper') private readonly mapper: Mapper<any>,
    private readonly songsRepository: ISongsRepository,
    private readonly unitOfWork: IUnitOfWork,
    private readonly songsService: ISongsService,
  ) { }

  async create(createSongDto: CreateSongDto): Promise<void> {
    try {
      const songByTitle = await this.songsRepository.getOne({ title: createSongDto.title});
  
      if (songByTitle) {
        throw new Error('Song already exists');
      }

      await this.unitOfWork.begin();
  
      const command = this.mapper.map<'CreateSongDto', CreateSongDto, 'SongCreateCommand', SongCreateCommand>(
        'CreateSongDto',
        createSongDto, 
        'SongCreateCommand'
      );

      const song = await this.songsService.instantiate(command);

      await this.songsRepository.create(song);

      await this.unitOfWork.commit();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.getAll();
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.getById(id);
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<void> {
    try {
      const song = await this.findOne(id);

      await this.unitOfWork.begin();

      const command = this.mapper.map<'UpdateSongDto', UpdateSongDto, 'SongUpdateCommand', SongUpdateCommand>(
        'UpdateSongDto',
        updateSongDto,
        'SongUpdateCommand'
      );

      this.songsService.update(song, command);

      await this.songsRepository.update(song);

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
      await this.songsRepository.delete(id);
      await this.unitOfWork.commit();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw new Error(error.message);
    }
  }
} 