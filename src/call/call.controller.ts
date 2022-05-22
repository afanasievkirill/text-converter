import {
	Body,
	Controller,
	Post,
	Get,
	UsePipes,
	ValidationPipe,
	Param,
	NotFoundException,
	Logger,
} from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CallService } from './call.service';
import { CreateCallDto } from './dto/create-call.dto';
import { CallModel } from './call.model';
import { CALL_CHRONE_JOB, GUID_NOT_FOUND_ERROR, PHONE_NOT_FOUND_ERROR } from './call.constance';
import { FilesService } from 'src/files/files.service';
import { FfmpegConverterService } from 'src/ffmpeg-converter/ffmpeg-converter.service';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@ApiTags('calls')
@Controller('calls')
export class CallController {
	constructor(
		private readonly callService: CallService,
		private readonly fileService: FilesService,
		private readonly ffmpegService: FfmpegConverterService,
		private readonly schedulerRegistry: SchedulerRegistry,
	) {}

	@Post()
	@ApiOkResponse({
		description: 'Эндпоинт записывает и возвращает Массив звонков.',
		type: [CallModel],
	})
	@ApiBody({ type: [CreateCallDto] })
	async createCalls(@Body() dto: CreateCallDto[]): Promise<CallModel[]> {
		return await this.callService.createCalls(dto);
	}

	@Post('one')
	@UsePipes(new ValidationPipe())
	@ApiOkResponse({
		description: 'Эндпоинт записывает возвращает Звонок в Базу.',
		type: CallModel,
	})
	@ApiBody({ type: CreateCallDto })
	async createCall(@Body() dto: CreateCallDto): Promise<CallModel> {
		const oldCall = await this.callService.getCallByGuid(dto.guid);
		if (!oldCall) {
			return await this.callService.createCall(dto);
		}
		return oldCall;
	}

	@Get()
	async getCalls(): Promise<string> {
		return 'dto';
	}

	@Get('phone/:phone')
	@ApiOkResponse({
		description: 'Эндпоинт возвращает Массив звонков по номеру телефона.',
		type: [CallModel],
	})
	@ApiNotFoundResponse({ description: PHONE_NOT_FOUND_ERROR })
	async getCallsByPhone(@Param('phone') phone: string): Promise<CallModel[]> {
		const responce = await this.callService.getCallByPhone(phone);
		if (!responce) {
			throw new NotFoundException(PHONE_NOT_FOUND_ERROR);
		}
		return responce;
	}

	@Get('guid/:guid')
	@ApiOkResponse({
		description: 'Эндпоинт возвращает Звонок по гуиду.',
		type: CallModel,
	})
	@ApiNotFoundResponse({ description: GUID_NOT_FOUND_ERROR })
	async getCallsByGuid(@Param('guid') guid: string): Promise<CallModel> {
		const responce = await this.callService.getCallByGuid(guid);
		if (!responce) {
			throw new NotFoundException(GUID_NOT_FOUND_ERROR);
		}
		return responce;
	}

	@Cron(CronExpression.EVERY_10_SECONDS, { name: CALL_CHRONE_JOB })
	async convertToText() {
		const job = this.schedulerRegistry.getCronJob(CALL_CHRONE_JOB);
		job.stop();
		const currentCall = await this.callService.getCallFromQueue();
		const assigh = { isAtWork: true };
		Object.assign(currentCall, assigh);
		await this.callService.updateByGuid(currentCall.guid, currentCall);
		const url = this.ffmpegService.convertFileByPath(currentCall.path);
		console.log(url);
	}
}
