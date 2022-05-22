import { Module } from '@nestjs/common';
import { FfmpegConverterService } from './ffmpeg-converter.service';
import { FfmpegConverterController } from './ffmpeg-converter.controller';

@Module({
  providers: [FfmpegConverterService],
  controllers: [FfmpegConverterController],
  exports: [FfmpegConverterService]
})
export class FfmpegConverterModule {}
