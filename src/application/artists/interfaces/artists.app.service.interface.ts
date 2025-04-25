import { CreateArtistDto } from 'src/data-transfer/artists/requests/create-artist.dto';
import { UpdateArtistDto } from 'src/data-transfer/artists/requests/update-artist.dto';
import { Artist } from 'src/domain/artists/entities/artist';

export abstract class IArtistsAppService {
  abstract create(createArtistDto: CreateArtistDto): Promise<void>;
  abstract findAll(): Promise<Artist[]>;
  abstract findOne(id: number): Promise<Artist>;
  abstract update(id: number, updateArtistDto: UpdateArtistDto): Promise<void>;
  abstract remove(id: number): Promise<void>;
} 