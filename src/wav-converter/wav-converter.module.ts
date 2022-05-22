import { Module } from '@nestjs/common';
import { WavConverterController } from './wav-converter.controller';
import { WavConverterService } from './wav-converter.service';

@Module({
  controllers: [WavConverterController],
  providers: [WavConverterService],
})
export class WavConverterModule {}
