// src/data-transfer/songs/upload-song.dto.ts
import { IsNumber } from 'class-validator';

export class UploadSongDto {

  @IsNumber()
  songId: number;
}
