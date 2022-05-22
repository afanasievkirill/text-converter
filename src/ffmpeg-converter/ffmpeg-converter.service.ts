import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import * as filePath from 'path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FfmpegConverterService {
	async convertFile() {
		const res = spawn('ffmpeg', [
			'-i',
			'/Users/aphk/WebstormProjects/wav-converter/uploads/test.mp3',
			'-acodec',
			'pcm_s16le',
			'-ac',
			'1',
			'-ar',
			'16000',
			'/Users/aphk/WebstormProjects/wav-converter/uploads/out.wav',
		]);

		res.stdout.on('data', (data: any) => {
			console.log(data.toString());
		});

		res.stderr.on('data', (data: any) => {
			console.log(data.toString());
		});

		res.on('close', () => {
			console.log('Файл сконвертирован.');
		});
	}

	convertFileByPath(mp3Path: string): string {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		ensureDir(uploadFolder);
		const originalName = filePath.basename(mp3Path);
		const url = `${uploadFolder}/${originalName}.wav`;
		const res = spawn('ffmpeg', [
			'-i',
			`${uploadFolder}`,
			'-acodec',
			'pcm_s16le',
			'-ac',
			'1',
			'-ar',
			'16000',
			`${url}`,
		]);

		res.stdout.on('data', (data: any) => {
			console.log(data.toString());
		});

		res.stderr.on('data', (data: any) => {
			console.log(data.toString());
		});

		res.on('close', () => {
			console.log('Файл сконвертирован.');
		});

		return url;
	}
}
