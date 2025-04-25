import { IEntity } from 'src/domain/shared/entity.interface';
import { Collection } from '@mikro-orm/core';
import { Song } from 'src/domain/songs/entities/song';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'artists' })
export class Artist implements IEntity {

    protected id: number;
    protected name: string;
    protected genre: string;
    protected biography: string | null;
    protected songs = new Collection<Song>(this);
    protected createdAt: Date;
    protected updatedAt: Date;
    protected deletedAt: Date | null;

    constructor(
        name?: string,
        genre?: string,
        biography?: string,
    ) {
        this.name = name;
        this.genre = genre;
        this.biography = biography || null;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getGenre(): string {
        return this.genre;
    }

    public getBiography(): string | null {
        return this.biography;
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

    public setName(name: string): void {
        this.name = name;
    }

    public setGenre(genre: string): void {
        this.genre = genre;
    }

    public setBiography(biography: string | null): void {
        this.biography = biography;
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
        if (!(entity instanceof Artist)) return false;
        return this.id === entity.getId();
    }
} 