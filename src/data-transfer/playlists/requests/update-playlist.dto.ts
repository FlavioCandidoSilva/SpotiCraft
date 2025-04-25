import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaylistDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The name of the playlist', example: 'My Playlist', required: false })
  name?: string;
} 