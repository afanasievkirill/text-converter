import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

export class CallText {
	@ApiProperty()
	text: string;
}

export class CallModel {
	@ApiProperty()
	@prop({ unique: true })
	guid: string;

	@ApiProperty()
	@prop()
	path: string;

	@ApiProperty()
	@prop()
	phone: string;

	@ApiProperty()
	@prop()
	url?: string;

	@ApiProperty({ type: () => CallText })
	@prop()
	callText?: CallText[];

	@ApiProperty()
	@prop({ default: false })
	isAtWork: boolean;

	@ApiProperty()
	@prop({ default: false })
	isReady: boolean;

	@ApiProperty()
	@prop({ default: false })
	isUnloaded: boolean;
}
