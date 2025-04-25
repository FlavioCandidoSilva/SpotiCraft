import { CreateSongDto } from 'src/data-transfer/songs/requests/create-song.dto';
import { UpdateSongDto } from 'src/data-transfer/songs/requests/update-song.dto';
import { Song } from 'src/domain/songs/entities/song';

export abstract class ISongsAppService {
  abstract create(createSongDto: CreateSongDto): Promise<void>;
  abstract findAll(): Promise<Song[]>;
  abstract findOne(id: number): Promise<Song>;
  abstract update(id: number, updateSongDto: UpdateSongDto): Promise<void>;
  abstract remove(id: number): Promise<void>;
} 