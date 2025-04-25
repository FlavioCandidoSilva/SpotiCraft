import { CreateAlbumDto } from 'src/data-transfer/albums/requests/create-album.dto';
import { UpdateAlbumDto } from 'src/data-transfer/albums/requests/update-album.dto';
import { Album } from 'src/domain/albums/entities/album';

export abstract class IAlbumsAppService {
  abstract create(createAlbumDto: CreateAlbumDto): Promise<void>;
  abstract findAll(): Promise<Album[]>;
  abstract findOne(id: number): Promise<Album>;
  abstract update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<void>;
  abstract remove(id: number): Promise<void>;
} 