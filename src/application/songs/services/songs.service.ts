import { Inject, Injectable } from '@nestjs/common';
import { ISongsRepository } from 'src/domain/songs/repositories/songs.repository.interface';
import { Song } from 'src/domain/songs/entities/song';
import { Mapper } from 'src/application/shared/mapper/types';
import { CreateSongDto } from 'src/data-transfer/songs/requests/create-song.dto';
import { SongCreateCommand } from 'src/domain/songs/services/commands/song-create.command';
import { IUnitOfWork } from 'src/domain/shared/unit-of-work.interface';
import { ISongsAppService } from '../interfaces/songs.app.service.interface';
import { ISongsService } from 'src/domain/songs/services/interfaces/songs.service.interface';

@Injectable()
export class SongsAppService implements ISongsAppService {
  constructor(
    @Inject('Mapper') private readonly mapper: Mapper<any>,
    private readonly songsRepository: ISongsRepository,
    private readonly unitOfWork: IUnitOfWork,
    private readonly songsService: ISongsService,
  ) { }

  async create(createSongDto: CreateSongDto): Promise<Song> {
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

      await this.unitOfWork.commit();

      return song;
  
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
} 