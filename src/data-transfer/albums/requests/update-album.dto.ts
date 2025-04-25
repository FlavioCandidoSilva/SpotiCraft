import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The title of the album', example: 'Album Title', required: false })
  title?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({ description: 'The release date of the album', example: '2023-01-01', required: false })
  releaseDate?: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The artist ID of the album', example: 1, required: false })
  artistId?: number;
} 