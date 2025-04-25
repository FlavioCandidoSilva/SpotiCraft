import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IArtistsAppService } from 'src/application/artists/interfaces/artists.app.service.interface';
import { CreateArtistDto } from 'src/data-transfer/artists/requests/create-artist.dto';
import { UpdateArtistDto } from 'src/data-transfer/artists/requests/update-artist.dto';
import { Artist } from 'src/domain/artists/entities/artist';

@Controller('artists')
export class ArtistsController {
  constructor(
    private readonly artistsAppService: IArtistsAppService,
  ) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<void> {
    return this.artistsAppService.create(createArtistDto);
  }

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistsAppService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    return this.artistsAppService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto): Promise<void> {
    return this.artistsAppService.update(+id, updateArtistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.artistsAppService.remove(+id);
  }
} 