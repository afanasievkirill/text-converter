import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FfmpegConverterService } from './ffmpeg-converter.service';

@ApiTags('ffmpeg')
@Controller('ffmpeg')
export class FfmpegConverterController {
  constructor(
    private readonly ffmpegConverterService: FfmpegConverterService,
  ) {}

  @ApiOkResponse({
    description: 'Эндпоинт запустил конвертацию файла из MP3 в Wav.',
  })
  @Get('convert')
  @HttpCode(200)
  async convertFile() {
    await this.ffmpegConverterService.convertFile();
  }
}
