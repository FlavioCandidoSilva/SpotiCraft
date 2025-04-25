import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IAlbumsAppService } from 'src/application/albums/interfaces/albums.app.service.interface';
import { CreateAlbumDto } from 'src/data-transfer/albums/requests/create-album.dto';
import { UpdateAlbumDto } from 'src/data-transfer/albums/requests/update-album.dto';
import { Album } from 'src/domain/albums/entities/album';

@Controller('albums')
export class AlbumsController {
  constructor(
    private readonly albumsAppService: IAlbumsAppService,
  ) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<void> {
    return this.albumsAppService.create(createAlbumDto);
  }

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumsAppService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    return this.albumsAppService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto): Promise<void> {
    return this.albumsAppService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.albumsAppService.remove(+id);
  }
} 