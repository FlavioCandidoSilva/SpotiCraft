import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @ApiProperty({ description: 'The name of the artist', example: 'Artist Name' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'The genre of the artist', example: 'Rock' })
  genre: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The biography of the artist', example: 'Artist biography', required: false })
  biography?: string;
} 