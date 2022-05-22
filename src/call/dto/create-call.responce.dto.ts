import { ApiProperty } from '@nestjs/swagger';

export class CreateCallResponce {
  @ApiProperty()
  guid: string;
}
