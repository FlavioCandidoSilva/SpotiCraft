export class SongCreateCommand {
  public readonly title: string;
  public readonly artistsId: number;
  public readonly albumId: number;
  public readonly genres: string;
  public readonly releaseDate: Date;
  public readonly duration: number;
  public readonly url: string;
  public readonly explicit: boolean;
}