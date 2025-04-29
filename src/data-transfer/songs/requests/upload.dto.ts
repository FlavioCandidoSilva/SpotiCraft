import { IsNumber } from 'class-validator';

export class UploadSongDto {

  @IsNumber()
  songId: number;
}
