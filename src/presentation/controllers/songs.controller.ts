import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ISongsAppService } from 'src/application/songs/interfaces/songs.app.service.interface';
import { CreateSongDto } from 'src/data-transfer/songs/requests/create-song.dto';
import { Song } from 'src/domain/songs/entities/song';

@Controller('songs')
export class SongsController {
  constructor(
    private readonly songsAppService: ISongsAppService,
  ) {}

  @Post()
  async create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsAppService.create(createSongDto);
  }
} 