import { IEntity } from 'src/domain/shared/entity.interface';
import { Collection } from '@mikro-orm/core';
import { Playlist } from 'src/domain/playlists/entities/playlist';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User implements IEntity {

    protected id: number;
    protected username: string;
    protected email: string;
    protected password: string;
    protected playlists = new Collection<Playlist>(this);
    protected createdAt: Date;
    protected updatedAt: Date;
    protected deletedAt: Date | null;

    constructor(
        username?: string,
        email?: string,
        password?: string,
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
    }

    public getId(): number {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getPlaylists(): Collection<Playlist> {
        return this.playlists;
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

    public setUsername(username: string): void {
        this.username = username;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPassword(password: string): void {
        this.password = password;
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
        if (!(entity instanceof User)) return false;
        return this.id === entity.getId();
    }
} 