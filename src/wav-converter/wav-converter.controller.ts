import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WavConverterService } from './wav-converter.service';

@ApiTags('wav')
@Controller('wav')
export class WavConverterController {
	constructor(private readonly wavConverterService: WavConverterService) {}

	@ApiOkResponse({
		description: 'Эндпоинт запустил конвертацию файла из Wav в Текст.',
	})
	@Get('convert')
	@HttpCode(200)
	async convertFile(): Promise<void> {
		await this.wavConverterService.convertFile();
	}

	@ApiOkResponse({
		description: 'Эндпоинт запустил конвертацию файла из Mp3 в Текст.',
	})
	@Get('text')
	@HttpCode(200)
	async convertFilefromMp3(): Promise<void> {
		await this.wavConverterService.convertFilefromMp3();
	}
}
