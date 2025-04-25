import { createProfile } from 'src/application/shared/mapper/createProfile';
import { CreateAlbumDto } from 'src/data-transfer/albums/requests/create-album.dto';
import { UpdateAlbumDto } from 'src/data-transfer/albums/requests/update-album.dto';
import { AlbumCreateCommand } from 'src/domain/albums/services/commands/album-create.command';
import { AlbumUpdateCommand } from 'src/domain/albums/services/commands/album-update.command';

export const createAlbumDtoToAlbumCreateCommand = createProfile<
  'CreateAlbumDto',
  'AlbumCreateCommand',
  (album: CreateAlbumDto) => AlbumCreateCommand
>(
  'CreateAlbumDto',
  'AlbumCreateCommand',
  (album: CreateAlbumDto): AlbumCreateCommand => ({
    title: album.title,
    releaseDate: album.releaseDate,
    artistId: album.artistId,
  }),
);

export const updateAlbumDtoToAlbumUpdateCommand = createProfile<
  'UpdateAlbumDto',
  'AlbumUpdateCommand',
  (album: UpdateAlbumDto) => AlbumUpdateCommand
>(
  'UpdateAlbumDto',
  'AlbumUpdateCommand',
  (album: UpdateAlbumDto): AlbumUpdateCommand => ({
    title: album.title,
    releaseDate: album.releaseDate,
    artistId: album.artistId,
  }),
); 