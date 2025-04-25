import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAlbumDto {
  @IsString()
  @ApiProperty({ description: 'The title of the album', example: 'Album Title' })
  title: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: 'The release date of the album', example: '2023-01-01' })
  releaseDate: Date;

  @IsNumber()
  @ApiProperty({ description: 'The artist ID of the album', example: 1 })
  artistId: number;
} 