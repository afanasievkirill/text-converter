import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginResponce {
  @ApiProperty()
  @IsString()
  access_token: string;
}
