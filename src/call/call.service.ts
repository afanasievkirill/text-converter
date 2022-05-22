import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CallModel } from './call.model';
import { CreateCallDto } from './dto/create-call.dto';

@Injectable()
export class CallService {
	constructor(@InjectModel(CallModel) private readonly callModel: ModelType<CallModel>) {}

	async createCalls(dtoArray: CreateCallDto[]): Promise<CallModel[]> {
		const res: CallModel[] = [];
		for await (const dto of dtoArray) {
			const call = {
				...dto,
				isAtWork: false,
				isReady: false,
				isUnloaded: false,
			};
			const guid = dto.guid;
			const oldCall = await this.callModel.findOne({ guid });
			if (!oldCall) {
				await this.callModel.create(call);
				res.push(call);
			} else {
				res.push(oldCall);
			}
		}
		return res;
	}

	async createCall(dto: CreateCallDto): Promise<CallModel> {
		const call = {
			...dto,
			isAtWork: false,
			isReady: false,
			isUnloaded: false,
		};
		return await this.callModel.create(call);
	}

	async getCallByGuid(guid: string): Promise<CallModel> {
		return await this.callModel.findOne({ guid });
	}

	async getCallByPhone(phone: string): Promise<CallModel[]> {
		return await this.callModel.find({ phone });
	}

	async getCallFromQueue(): Promise<CallModel> {
		return await this.callModel.findOne({ isAtWork: false });
	}

	async updateByGuid(guid: string, dto: CallModel) {
		return await this.callModel.findOneAndUpdate({ guid }, dto, { new: true }).exec();
	}
}
