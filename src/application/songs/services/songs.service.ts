import { Inject, Injectable } from '@nestjs/common';
import { ISongsRepository } from 'src/domain/songs/repositories/songs.repository.interface';
import { Song } from 'src/domain/songs/entities/song';
import { ISongsService } from '../interfaces/songs-service.interface';

@Injectable()
export class SongsService implements ISongsService {
  constructor(
  ) {}

  // async create(createSongDto: CreateSongDto): Promise<Song> {
  //   const { title, duration, genres, url, explicit, releaseDate } = createSongDto;

  //   const song = new Song(
  //     title,
  //     duration,
  //     createSongDto.albumId,
  //     createSongDto.artistsId,
  //     genres,
  //     url,
  //     explicit,
  //     releaseDate,
  //   );

  //   return this.songsRepository.create(song);
  // }
} 