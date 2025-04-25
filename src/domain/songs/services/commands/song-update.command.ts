export class SongUpdateCommand {
  public readonly title?: string;
  public readonly duration?: number;
  public readonly albumId?: number;
  public readonly artistsId?: number;
  public readonly genres?: string;
  public readonly url?: string;
  public readonly explicit?: boolean;
  public readonly releaseDate?: Date;
} 