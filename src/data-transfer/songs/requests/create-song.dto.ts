import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {

  @IsString()
  @ApiProperty({ description: 'The title of the song' })
  @ApiProperty({ example: 'Song Title' })
  title: string;

  @IsNumber()
  @ApiProperty({ description: 'The duration of the song in seconds' })
  @ApiProperty({ example: 300 })
  duration: number;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'The genres of the song' })
  @ApiProperty({ example: ['Pop', 'Rock'] })
  genres: string[];

  @IsUrl()
  @ApiProperty({ description: 'The URL of the song' })
  @ApiProperty({ example: 'https://example.com/song.mp3' })
  url: string;

  @IsBoolean()
  @ApiProperty({ description: 'Whether the song is explicit or not' })
  @ApiProperty({ example: true })
  explicit: boolean;

  @IsDate()
  @ApiProperty({ description: 'The release date of the song' })
  @ApiProperty({ example: '2023-01-01' })
  releaseDate: Date;

  @ApiProperty({ description: 'The album ID of the song' })
  @ApiProperty({ example: 1 })
  albumId: number;

  @ApiProperty({ description: 'The artist ID of the song' })
  @ApiProperty({ example: 1 })
  artistsId: number;

  @ApiProperty({ description: 'The created at date of the song' })
  @ApiProperty({ example: '2023-01-01' })
  createdAt: Date;

  @ApiProperty({ description: 'The updated at date of the song' })
  @ApiProperty({ example: '2023-01-01' })
  updatedAt: Date;

  @ApiProperty({ description: 'The deleted at date of the song' })
  @ApiProperty({ example: '2023-01-01' })
  deletedAt: Date;

}
