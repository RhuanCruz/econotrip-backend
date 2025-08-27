import { Location } from '@prisma/client';

interface ILocationRepository {
  listByKey(key: string): Promise<Location[]>;
  create(data: Partial<Location>): Promise<Location>;
  update(id: number, data: Partial<Location>): Promise<Location>;
  delete(id: number): Promise<void>;
  getByIata(iata: string): Promise<Location | null>;
  getByCityCode(cityCode: string): Promise<Location | null>;
  upsert(data: Omit<Location, 'id'>): Promise<Location>;
}

export default ILocationRepository;
