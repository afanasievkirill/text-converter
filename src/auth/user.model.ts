import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
  @ApiProperty()
  @prop({ unique: true })
  email: string;

  @ApiProperty()
  @prop()
  passwordHash: string;
}
