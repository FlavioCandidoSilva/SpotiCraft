import { IEntity } from 'src/domain/shared/entity.interface';
import { Collection } from '@mikro-orm/mysql';

export class Song implements IEntity {

    protected id: number;
    protected title: string;
    protected duration: number;
    // protected albumId: Collection;
    // protected artistsId: Collection;
    protected genres: string[];
    protected url: string;
    protected explicit: boolean;
    protected releaseDate: Date;
    protected createdAt: Date;
    protected updatedAt: Date;
    protected deletedAt: Date | null;

    constructor(
        id: number,
        title: string,
        duration: number,
        // albumId: Collection,
        // artistsId: Collection,
        genres: string[],
        url: string,
        explicit: boolean,
        releaseDate: Date,
    ) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        // this.albumId = albumId;
        // this.artistsId = artistsId;
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
    // public getAlbumId(): Collection{
    //     return this.albumId;
    // }
    // public getArtistsId(): Collection{
    //     return this.artistsId;
    // }

    public getGenres(): string[] {
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

    public setTitle(title: string): void {
        this.title = title;
    }

    public setDuration(duration: number): void {
        this.duration = duration;
    }

    // public setAlbumId(albumId: Collection): void{
    //     this.albumId = albumId;
    // }    

    // public setArtistsId(artistsId: Collection): void{
    //     this.artistsId = artistsId;  
    // }

    public setGenres(genres: string[]): void {
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

    public equals(entity: IEntity): boolean {
        if (!(entity instanceof Song)) return false;
        return this.id === entity.getId();
    }

}