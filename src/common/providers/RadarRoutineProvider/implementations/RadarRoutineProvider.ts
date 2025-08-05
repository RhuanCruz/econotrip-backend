import { injectable } from 'inversify';
import axios from 'axios';

import { Errors, AppError } from '@src/common/errors';
import Config from '@src/config';
import IRadarRoutineProvider from '@common/providers/RadarRoutineProvider/repositories/IRadarRoutineProvider';
import ICreateRadarRoutineDTO from '../dtos/ICreateRoutineDTO';
import IDeleteRadarRoutineDTO from '../dtos/IDeleteRoutineDTO';
import IListResultsByContinentDTO from '../dtos/IListResultsByContinentDTO';
import ListRoutineResultResponse from '../responses/ListRoutineResultResponse';
import ListResultsByContinentResponse from '../responses/ListResultsByContinentResponse';

@injectable()
class RadarRoutineProvider implements IRadarRoutineProvider {
  private api = axios.create({ baseURL: Config.radarRoutines.url });

  async create(data: ICreateRadarRoutineDTO): Promise<void> {
    await this.api.post('/routines', data)
      .catch((err) => { console.log(err.cause); throw AppError.createAppError(Errors.RADAR_ROUTINE_NOT_CREATED); });
  }

  async delete(data: IDeleteRadarRoutineDTO): Promise<void> {
    await this.api.delete('/routines', { data })
      .catch((err) => { console.log(err); throw AppError.createAppError(Errors.RADAR_ROUTINE_NOT_DELETED); });
  }

  async listResults(data: IDeleteRadarRoutineDTO): Promise<ListRoutineResultResponse> {
    return this.api.get('/routines/results', { params: data })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw AppError.createAppError(Errors.RADAR_ROUTINE_RESULTS_NOT_LISTED); });
  }

  async listResultsByContinent(data: IListResultsByContinentDTO): Promise<ListResultsByContinentResponse> {
    return this.api.get(`/continents/results?continent=${data.continent}`)
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw AppError.createAppError(Errors.RADAR_ROUTINE_CONTINENT_RESULTS_NOT_LISTED); });
  }
}

export default RadarRoutineProvider;
