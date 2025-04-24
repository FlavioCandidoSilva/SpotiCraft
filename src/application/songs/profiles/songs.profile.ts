import { createProfile } from 'src/application/shared/mapper/createProfile';
import { CreateSongDto } from 'src/data-transfer/songs/requests/create-song.dto';
import { SongCreateCommand } from 'src/domain/songs/services/commands/song-create.command';


export const createSongDtoToSongCreateCommand = createProfile<
  'CreateSongDto',
  'SongCreateCommand',
  (songs: CreateSongDto) => SongCreateCommand
>(
  'CreateSongDto',
  'SongCreateCommand',
  (songs: CreateSongDto): SongCreateCommand => ({
    title: songs.title,
    artistsId: songs.artistsId,
    albumId: songs.albumId,
    genres: JSON.stringify(songs.genres),
    releaseDate: songs.releaseDate,
    duration: songs.duration,
    explicit: songs.explicit,
    url: songs.url,
  }),
);
