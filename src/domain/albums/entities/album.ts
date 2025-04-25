import { IEntity } from 'src/domain/shared/entity.interface';
import { Collection } from '@mikro-orm/core';
import { Song } from 'src/domain/songs/entities/song';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'albums' })
export class Album implements IEntity {

    protected id: number;
    protected title: string;
    protected releaseDate: Date;
    protected artistId: number;
    protected songs = new Collection<Song>(this);
    protected createdAt: Date;
    protected updatedAt: Date;
    protected deletedAt: Date | null;

    constructor(
        title?: string,
        releaseDate?: Date,
        artistId?: number,
    ) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.artistId = artistId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getReleaseDate(): Date {
        return this.releaseDate;
    }

    public getArtistId(): number {
        return this.artistId;
    }

    public getSongs(): Collection<Song> {
        return this.songs;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public getDeletedAt(): Date | null {
        return this.deletedAt;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setReleaseDate(releaseDate: Date): void {
        this.releaseDate = releaseDate;
    }

    public setArtistId(artistId: number): void {
        this.artistId = artistId;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }

    public setDeletedAt(deletedAt: Date | null): void {
        this.deletedAt = deletedAt;
    }

    public equals(entity: IEntity): boolean {
        if (!(entity instanceof Album)) return false;
        return this.id === entity.getId();
    }
} 