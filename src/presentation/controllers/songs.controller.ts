import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ISongsAppService } from 'src/application/songs/interfaces/songs.app.service.interface';
import { CreateSongDto } from 'src/data-transfer/songs/requests/create-song.dto';
import { UpdateSongDto } from 'src/data-transfer/songs/requests/update-song.dto';
import { Song } from 'src/domain/songs/entities/song';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadSongDto } from 'src/data-transfer/songs/requests/upload.dto';

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/songs',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async uploadSong(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadSongDto: UploadSongDto
  ) {
    return this.songsAppService.uploadSong(file, uploadSongDto);
  }
} 