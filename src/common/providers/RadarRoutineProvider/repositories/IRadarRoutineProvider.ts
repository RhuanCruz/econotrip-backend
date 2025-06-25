import ICreateRadarRoutineDTO from '../dtos/ICreateRoutineDTO';
import IDeleteRadarRoutineDTO from '../dtos/IDeleteRoutineDTO';
import IListRoutineResultDTO from '../dtos/IListRoutineResultDTO';
import ListRoutineResultResponse from '../responses/ListRoutineResultResponse';

interface IRadarRoutineProvider {
  create(data: ICreateRadarRoutineDTO): Promise<void>;
  delete(data: IDeleteRadarRoutineDTO): Promise<void>;
  listResults(data: IListRoutineResultDTO): Promise<ListRoutineResultResponse>;
}

export default IRadarRoutineProvider;
