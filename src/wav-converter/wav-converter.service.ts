import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import * as fs from 'fs';
import * as wav from 'wav';
import * as vosk from 'vosk';
import { path } from 'app-root-path';

import { CallText } from './call.model';
import { spawn } from 'child_process';

@Injectable()
export class WavConverterService {
  MODEL_PATH = `${path}/vosk-model`;
  FILE_NAME = `${path}/uploads/out.wav`;
  MP3_FILE_NAME = `${path}/uploads/test.mp3`;
  SAMPLE_RATE = 16000;
  BUFFER_SIZE = 4000;

  async convertFile() {
    if (!fs.existsSync(this.MODEL_PATH)) {
      console.log(
        'Загрузите библиотеку https://alphacephei.com/vosk/models и распакуйте ' +
          this.MODEL_PATH +
          ' данную папку.',
      );
      process.exit();
    }
    vosk.setLogLevel(0);
    const model = new vosk.Model(this.MODEL_PATH);
    console.log(1);
    const wfReader = new wav.Reader();
    const wfReadable = new Readable().wrap(wfReader);
    await wfReader.on(
      'format',
      async ({ audioFormat, sampleRate, channels }) => {
        if (audioFormat != 1 || channels != 1) {
          console.error('Аудио файл должен быть WAV формате моно PCM.');
          process.exit(1);
        }
        const rec = new vosk.Recognizer({
          model: model,
          sampleRate: sampleRate,
        });
        const callText: CallText[] = [];
        rec.setWords(false);
        for await (const data of wfReadable) {
          const end_of_speech = rec.acceptWaveform(data);
          if (end_of_speech) {
            const text: CallText = rec.result();
            callText.push(text);
          }
        }
        console.log(callText);
        rec.free();
      },
    );
    await fs
      .createReadStream(this.FILE_NAME, { highWaterMark: 4096 })
      .pipe(wfReader)
      .on('finish', function () {
        model.free();
      });
  }

  async convertFilefromMp3() {
    const responce: CallText[] = [];
    if (!fs.existsSync(this.MODEL_PATH)) {
      console.log(
        'Please download the model from https://alphacephei.com/vosk/models and unpack as ' +
          this.MODEL_PATH +
          ' in the current folder.',
      );
      process.exit();
    }
    if (process.argv.length > 2) this.MP3_FILE_NAME = process.argv[2];
    vosk.setLogLevel(0);
    const model = new vosk.Model(this.MODEL_PATH);
    const rec = new vosk.Recognizer({
      model: model,
      sampleRate: this.SAMPLE_RATE,
    });
    const ffmpeg_run = spawn('ffmpeg', [
      '-loglevel',
      'quiet',
      '-i',
      this.FILE_NAME,
      '-ar',
      String(this.SAMPLE_RATE),
      '-ac',
      '1',
      '-f',
      's16le',
      '-bufsize',
      String(this.BUFFER_SIZE),
      '-',
    ]);
      ffmpeg_run.stdout.on('data', (stdout) => {
       if (rec.acceptWaveform(stdout)) {
        console.log(rec.result());
        const result =  rec.result()
        responce.push(result)
      }
      
      else console.log(rec.partialResult());
      console.log(rec.finalResult());
      
    });
  }
}
