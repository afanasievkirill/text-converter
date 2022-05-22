import { Module } from '@nestjs/common';
import { Mp3ConverterService } from './mp3-converter.service';
import { Mp3ConverterController } from './mp3-converter.controller';

@Module({
  providers: [Mp3ConverterService],
  controllers: [Mp3ConverterController],
  exports: [Mp3ConverterService],
})
export class Mp3ConverterModule {}
