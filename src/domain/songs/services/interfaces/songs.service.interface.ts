import { Song } from "../../entities/song"
import { SongCreateCommand } from "../commands/song-create.command";
import { SongUpdateCommand } from '../commands/song-update.command';

export abstract class ISongsService {
    abstract instantiate(command: SongCreateCommand): Promise<Song>
    abstract update(song: Song, command: SongUpdateCommand): Song
}