import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ISongsAppService } from 'src/application/songs/interfaces/songs.app.service.interface';
import { CreateSongDto } from 'src/data-transfer/songs/requests/create-song.dto';
import { UpdateSongDto } from 'src/data-transfer/songs/requests/update-song.dto';
import { Song } from 'src/domain/songs/entities/song';

@Controller('songs')
export class SongsController {
  constructor(
    private readonly songsAppService: ISongsAppService,
  ) {}

  @Post()
  async create(@Body() createSongDto: CreateSongDto): Promise<void> {
    return this.songsAppService.create(createSongDto);
  }

  @Get()
  async findAll(): Promise<Song[]> {
    return this.songsAppService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Song> {
    return this.songsAppService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto): Promise<void> {
    return this.songsAppService.update(+id, updateSongDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.songsAppService.remove(+id);
  }
} 