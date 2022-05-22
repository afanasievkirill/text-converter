import { Module } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TypegooseModule } from 'nestjs-typegoose';
import { FfmpegConverterService } from 'src/ffmpeg-converter/ffmpeg-converter.service';
import { FilesService } from 'src/files/files.service';
import { CallController } from './call.controller';
import { CallModel } from './call.model';
import { CallService } from './call.service';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: CallModel,
				schemaOptions: {
					collection: 'Call',
				},
			},
		]),
	],
	controllers: [CallController],
	providers: [CallService, FilesService, FfmpegConverterService],
})
export class CallModule {}
