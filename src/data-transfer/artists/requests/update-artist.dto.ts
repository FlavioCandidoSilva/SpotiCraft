import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The name of the artist', example: 'Artist Name', required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The genre of the artist', example: 'Rock', required: false })
  genre?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The biography of the artist', example: 'Artist biography', required: false })
  biography?: string;
} 