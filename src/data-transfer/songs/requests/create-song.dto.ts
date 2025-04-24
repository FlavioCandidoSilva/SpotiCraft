import { IsArray, IsBoolean, IsDate, IsNumber, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {

  @IsString()
  @ApiProperty({ description: 'The title of the song', example: 'Song Title' })
  title: string;

  @IsNumber()
  @ApiProperty({ description: 'The duration of the song in seconds', example: 300 })
  duration: number;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'The genres of the song', example: ['Pop', 'Rock'] })
  genres: string;

  @IsUrl()
  @ApiProperty({ description: 'The URL of the song', example: 'https://example.com/song.mp3' })
  url: string;

  @IsBoolean()
  @ApiProperty({ description: 'Whether the song is explicit or not', example: true })
  explicit: boolean;

  @IsDate()
  @ApiProperty({ description: 'The release date of the song', example: '2023-01-01' })
  releaseDate: Date;

  @IsNumber()
  @ApiProperty({ description: 'The album ID of the song', example: 1 })
  albumId: number;

  @IsNumber()
  @ApiProperty({ description: 'The artist ID of the song', example: 1 })
  artistsId: number;
}