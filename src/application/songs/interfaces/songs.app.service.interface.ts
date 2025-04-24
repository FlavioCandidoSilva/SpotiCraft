import { CreateSongDto } from 'src/data-transfer/songs/requests/create-song.dto';
import { Song } from 'src/domain/songs/entities/song';

export abstract class ISongsAppService {
  abstract create(createSongDto: CreateSongDto): Promise<void>;
} 