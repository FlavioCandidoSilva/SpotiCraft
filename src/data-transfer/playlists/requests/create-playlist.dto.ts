import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @IsString()
  @ApiProperty({ description: 'The name of the playlist', example: 'My Playlist' })
  name: string;

  @IsNumber()
  @ApiProperty({ description: 'The user ID of the playlist', example: 1 })
  userId: number;
} 