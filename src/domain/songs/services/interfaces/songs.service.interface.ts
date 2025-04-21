import { Song } from "../../entities/song"
import { SongCreateCommand } from "../commands/song-create.command";

export abstract class ISongsService {
    abstract instantiate(command: SongCreateCommand): Song
}