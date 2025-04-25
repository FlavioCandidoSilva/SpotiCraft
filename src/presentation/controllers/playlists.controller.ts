import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IPlaylistsAppService } from 'src/application/playlists/interfaces/playlists.app.service.interface';
import { CreatePlaylistDto } from 'src/data-transfer/playlists/requests/create-playlist.dto';
import { UpdatePlaylistDto } from 'src/data-transfer/playlists/requests/update-playlist.dto';
import { Playlist } from 'src/domain/playlists/entities/playlist';

@Controller('playlists')
export class PlaylistsController {
  constructor(
    private readonly playlistsAppService: IPlaylistsAppService,
  ) {}

  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto): Promise<void> {
    return this.playlistsAppService.create(createPlaylistDto);
  }

  @Get()
  async findAll(): Promise<Playlist[]> {
    return this.playlistsAppService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Playlist> {
    return this.playlistsAppService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto): Promise<void> {
    return this.playlistsAppService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.playlistsAppService.remove(+id);
  }

  @Post(':id/songs/:songId')
  async addSong(@Param('id') id: string, @Param('songId') songId: string): Promise<void> {
    return this.playlistsAppService.addSong(+id, +songId);
  }

  @Delete(':id/songs/:songId')
  async removeSong(@Param('id') id: string, @Param('songId') songId: string): Promise<void> {
    return this.playlistsAppService.removeSong(+id, +songId);
  }
} 