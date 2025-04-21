
import { FilterQuery } from '@mikro-orm/core';
import { BaseRepository } from '../../shared/base.repository';
import { Song } from 'src/domain/songs/entities/song';
import { ISongsRepository } from 'src/domain/songs/repositories/songs.repository.interface';

export class SongsRepository extends BaseRepository<Song> implements ISongsRepository {

    constructor() {
        super(Song);
    }
}