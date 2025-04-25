import { createProfile } from 'src/application/shared/mapper/createProfile';
import { CreateArtistDto } from 'src/data-transfer/artists/requests/create-artist.dto';
import { UpdateArtistDto } from 'src/data-transfer/artists/requests/update-artist.dto';
import { ArtistCreateCommand } from 'src/domain/artists/services/commands/artist-create.command';
import { ArtistUpdateCommand } from 'src/domain/artists/services/commands/artist-update.command';

export const createArtistDtoToArtistCreateCommand = createProfile<
  'CreateArtistDto',
  'ArtistCreateCommand',
  (artist: CreateArtistDto) => ArtistCreateCommand
>(
  'CreateArtistDto',
  'ArtistCreateCommand',
  (artist: CreateArtistDto): ArtistCreateCommand => ({
    name: artist.name,
    genre: artist.genre,
    biography: artist.biography,
  }),
);

export const updateArtistDtoToArtistUpdateCommand = createProfile<
  'UpdateArtistDto',
  'ArtistUpdateCommand',
  (artist: UpdateArtistDto) => ArtistUpdateCommand
>(
  'UpdateArtistDto',
  'ArtistUpdateCommand',
  (artist: UpdateArtistDto): ArtistUpdateCommand => ({
    name: artist.name,
    genre: artist.genre,
    biography: artist.biography,
  }),
); 