import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateSongDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The title of the song', example: 'Song Title', required: false })
  title?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The duration of the song in seconds', example: 300, required: false })
  duration?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The genres of the song', example: '["Pop", "Rock"]', required: false })
  genres?: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({ description: 'The URL of the song', example: 'https://example.com/song.mp3', required: false })
  url?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Whether the song is explicit or not', example: true, required: false })
  explicit?: boolean;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({ description: 'The release date of the song', example: '2023-01-01', required: false })
  releaseDate?: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The album ID of the song', example: 1, required: false })
  albumId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The artist ID of the song', example: 1, required: false })
  artistsId?: number;
} 