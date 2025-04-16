import { Inject, Injectable } from '@nestjs/common';
import { CreateSongDto } from '../../data-transfer/songs/requests/create-song.dto';
import { ISongsRepository } from 'src/domain/songs/repositories/songs.repository.interface';
import { Song } from 'src/domain/songs/entities/song';
import { ISongsService } from '../interfaces/songs-service.interface';

@Injectable()
export class SongsService implements ISongsService {
  constructor(
    @Inject('SongsRepository')
    private readonly songsRepository: ISongsRepository,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const { title, duration, genres, url, explicit, releaseDate } = createSongDto;

    const song = new Song(
      0, 
      title,
      duration,
      genres,
      url,
      explicit,
      releaseDate,
    );

    return this.songsRepository.create(song);
  }
} 