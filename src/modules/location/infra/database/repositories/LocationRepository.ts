import { injectable } from 'inversify';
import { PrismaClient, Location } from '@prisma/client';
import ILocationRepository from '@src/modules/location/repositories/ILocationRepository';

@injectable()
class LocationRepository implements ILocationRepository {
  private prisma = new PrismaClient();

  public async listByKey(key: string): Promise<Location[]> {
    return this.prisma.location.findMany({
      where: {
        OR: [
          {
            iata: {
              equals: key,
            },
          },
          {
            name: {
              contains: key,
            },
          },
        ],
      },
    });
  }
}

export default LocationRepository;
