import { Get, OperationId, Path, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';

import path from 'path';
import fs from 'fs/promises';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IRadarRepository from '@repositories/IRadarRepository';
import IStorageProvider from '@providers/IStorageProvider';
import Config from '@src/config';
import { GetRadarFlightsResponse } from './GetRadarFlightsResponse';

@injectable()
@Route('radars')
@Tags('Radar')
class GetRadarFlightsService {
  @inject(Types.RadarRepository) private radarRepository: IRadarRepository;

  @inject(Types.LocalStorageProvider) private localStorageProvider: IStorageProvider;

  @Get('/{radarId}/flights')
  @Security('BearerAuth')
  @OperationId('get_radar_flights')
  public async execute(@Path() radarId: number): Promise<GetRadarFlightsResponse> {
    const radar = await this.radarRepository.findById(radarId);
    if (!radar) throw AppError.createAppError(Errors.RADAR_NOT_FOUND);

    const dir = await this.localStorageProvider.listDir(Config.storage.flightsData);

    const files = dir.filter((file) => {
      const match = file.split('-');
      return match && match[0] === radar.origin && match[1] === radar.destination;
    });

    if (!files.length) {
      return {
        origin: radar.origin,
        destination: radar.destination,
        records: [],
      };
    }

    const fileStats = await Promise.all(files.map(async (file) => {
      const filePath = path.join(Config.storage.flightsData, file);
      const stats = await fs.stat(filePath);
      return {
        name: file,
        path: filePath,
        mtime: stats.mtime,
      };
    }));

    fileStats.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    const file = await this.localStorageProvider.read(path.join(Config.storage.flightsData, fileStats[0].name));
    const json: GetRadarFlightsResponse = JSON.parse(file.toString('utf8'));

    const records = json.records.filter((record: { date: string, price: number }) => new Date(record.date).getTime() > new Date(radar.start).getTime() && new Date(record.date).getTime() < new Date(radar.end).getTime());
    records.sort((a, b) => a.price - b.price);

    return {
      origin: radar.origin,
      destination: radar.destination,
      records: records.slice(0, 10),
    };
  }
}

export { GetRadarFlightsService };
