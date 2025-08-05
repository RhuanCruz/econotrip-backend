import ICreateRadarRoutineDTO from '../dtos/ICreateRoutineDTO';
import IDeleteRadarRoutineDTO from '../dtos/IDeleteRoutineDTO';
import IListRoutineResultDTO from '../dtos/IListRoutineResultDTO';
import IListResultsByContinentDTO from '../dtos/IListResultsByContinentDTO';
import ListRoutineResultResponse from '../responses/ListRoutineResultResponse';
import ListResultsByContinentResponse from '../responses/ListResultsByContinentResponse';

interface IRadarRoutineProvider {
  create(data: ICreateRadarRoutineDTO): Promise<void>;
  delete(data: IDeleteRadarRoutineDTO): Promise<void>;
  listResults(data: IListRoutineResultDTO): Promise<ListRoutineResultResponse>;
  listResultsByContinent(data: IListResultsByContinentDTO): Promise<ListResultsByContinentResponse>;
}

export default IRadarRoutineProvider;
