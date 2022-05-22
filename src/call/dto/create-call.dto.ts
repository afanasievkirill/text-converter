import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCallDto {
  @ApiProperty()
  @IsString()
  guid: string;

  @ApiProperty()
  @IsString()
  path: string;

  @ApiProperty()
  @IsString()
  phone: string;
}
