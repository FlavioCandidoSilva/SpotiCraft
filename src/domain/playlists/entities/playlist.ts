import { IEntity } from 'src/domain/shared/entity.interface';
import { Collection } from '@mikro-orm/core';
import { Song } from 'src/domain/songs/entities/song';
import { User } from 'src/domain/users/entities/user';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'playlists' })
export class Playlist implements IEntity {

    protected id: number;
    protected name: string;
    protected userId: number;
    protected songs = new Collection<Song>(this);
    protected user: User;
    protected createdAt: Date;
    protected updatedAt: Date;
    protected deletedAt: Date | null;

    constructor(
        name?: string,
        userId?: number,
    ) {
        this.name = name;
        this.userId = userId;
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

    public getUserId(): number {
        return this.userId;
    }

    public getSongs(): Collection<Song> {
        return this.songs;
    }

    public getUser(): User {
        return this.user;
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

    public setUserId(userId: number): void {
        this.userId = userId;
    }

    public setUser(user: User): void {
        this.user = user;
        if (user) {
            this.userId = user.getId();
        }
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
        if (!(entity instanceof Playlist)) return false;
        return this.id === entity.getId();
    }
} 