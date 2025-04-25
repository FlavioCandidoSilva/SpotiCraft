import { Album } from '../../entities/album';
import { AlbumCreateCommand } from '../commands/album-create.command';
import { AlbumUpdateCommand } from '../commands/album-update.command';

export abstract class IAlbumsService {
  abstract instantiate(command: AlbumCreateCommand): Album;
  abstract update(album: Album, command: AlbumUpdateCommand): Album;
} 