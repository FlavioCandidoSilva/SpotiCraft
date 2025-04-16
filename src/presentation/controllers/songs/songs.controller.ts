import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ISongsService } from 'src/application/songs/interfaces/songs-service.interface';
import { CreateSongDto } from 'src/application/data-transfer/songs/requests/create-song.dto';
import { Song } from 'src/domain/songs/entities/song';

@Controller('songs')
export class SongsController {
  constructor(
    @Inject('SongsService')
    private readonly songsService: ISongsService,
  ) {}

  @Post()
  async create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDto);
  }
} 