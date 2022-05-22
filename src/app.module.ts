import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { WavConverterModule } from './wav-converter/wav-converter.module';
import { AuthModule } from './auth/auth.module';
import { Mp3ConverterModule } from './mp3-converter/mp3-converter.module';
import { CallModule } from './call/call.module';
import { FilesModule } from './files/files.module';
import { FfmpegConverterModule } from './ffmpeg-converter/ffmpeg-converter.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		ScheduleModule.forRoot(),
		WavConverterModule,
		AuthModule,
		Mp3ConverterModule,
		CallModule,
		FilesModule,
		FfmpegConverterModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
