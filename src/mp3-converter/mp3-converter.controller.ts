import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Mp3ConverterService } from './mp3-converter.service';

@ApiTags('mp3')
@Controller('mp3')
export class Mp3ConverterController {
  constructor(private readonly mp3ConverterService: Mp3ConverterService) {}

  @ApiOkResponse({
    description: 'Эндпоинт запустил конвертацию файла из MP3 в WAV.',
  })
  @Get('convert')
  async convert() {
    await this.mp3ConverterService.convert();
  }
}
