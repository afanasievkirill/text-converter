import { Injectable } from '@nestjs/common';
import * as Mp3ToWav from 'mp3-to-wav';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir } from 'fs-extra';

@Injectable()
export class Mp3ConverterService {
  async convert() {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);
    const mp3ToWav = await new Mp3ToWav(
      `${path}/upload/2022-05-15/test.mp3`,
      uploadFolder,
    );
    await mp3ToWav.exec();
  }
}
