import { Song } from 'src/domain/songs/entities/song';
import { CreateSongDto } from '../../data-transfer/songs/requests/create-song.dto';

export interface ISongsService {
  create(createSongDto: CreateSongDto): Promise<Song>;
} 