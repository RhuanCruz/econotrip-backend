import { Location } from '@prisma/client';

interface ILocationRepository {
  listByKey(key: string): Promise<Location[]>;
}

export default ILocationRepository;
