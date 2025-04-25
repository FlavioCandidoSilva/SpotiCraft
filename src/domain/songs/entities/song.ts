import { IEntity } from 'src/domain/shared/entity.interface';
import { Collection } from '@mikro-orm/mysql';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Artist } from 'src/domain/artists/entities/artist';
import { Album } from 'src/domain/albums/entities/album';

@Entity({ tableName: 'songs' })
export class Song implements IEntity {

    @PrimaryKey()
    protected id: number;
    
    @Property()
    protected title: string;
    
    @Property()
    protected duration: number;
    
    @Property()
    protected albumId: number;
    
    @Property()
    protected artistsId: number;
    
    @Property()
    protected genres: string;
    
    @Property()
    protected url: string;
    
    @Property()
    protected explicit: boolean;
    
    @Property()
    protected releaseDate: Date;
    
    @Property()
    protected createdAt: Date;
    
    @Property()
    protected updatedAt: Date;
    
    @Property({ nullable: true })
    protected deletedAt: Date | null;

    protected artist: Artist;
    protected album: Album;

    constructor(
        title?: string,
        duration?: number,
        albumId?: number,
        artistsId?: number,
        genres?: string,
        url?: string,
        explicit?: boolean,
        releaseDate?: Date,
    ) {
        this.title = title;
        this.duration = duration;
        this.albumId = albumId;
        this.artistsId = artistsId;
        this.genres = genres;
        this.url = url;
        this.explicit = explicit;
        this.releaseDate = releaseDate;
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

    public getDuration(): number {
        return this.duration;
    }

    public getAlbumId(): number {
        return this.albumId;
    }

    public getArtistsId(): number {
        return this.artistsId;
    }

    public getGenres(): string {
        return this.genres;
    }

    public getUrl(): string {
        return this.url;
    }

    public isExplicit(): boolean {
        return this.explicit;
    }

    public getReleaseDate(): Date {
        return this.releaseDate;
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

    public getArtist(): Artist {
        return this.artist;
    }

    public getAlbum(): Album {
        return this.album;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setDuration(duration: number): void {
        this.duration = duration;
    }

    public setAlbumId(albumId: number): void {
        this.albumId = albumId;
    }
    public setArtistsId(artistsId: number): void {
        this.artistsId = artistsId;
    }
    public setId(id: number): void {
        this.id = id;
    }

    public setArtistId(artistId: number): void {
        this.artistsId = artistId;
    }

    public setGenres(genres: string): void {
        this.genres = genres;
    }

    public setUrl(url: string): void {
        this.url = url;
    }

    public setExplicit(explicit: boolean): void {
        this.explicit = explicit;
    }

    public setReleaseDate(releaseDate: Date): void {
        this.releaseDate = releaseDate;
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

    public setArtist(artist: Artist): void {
        this.artist = artist;
    }

    public setAlbum(album: Album): void {
        this.album = album;
    }

    public equals(entity: IEntity): boolean {
        if (!(entity instanceof Song)) return false;
        return this.id === entity.getId();
    }

}