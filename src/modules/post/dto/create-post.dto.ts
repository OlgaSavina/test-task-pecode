import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {

  @ApiProperty({
    example: 'Post body',
  })
  @IsNotEmpty()
  post: string;
}
