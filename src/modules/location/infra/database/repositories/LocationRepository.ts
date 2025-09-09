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
              mode: 'insensitive',
            },
          },
          {
            cityName: {
              contains: key,
              mode: 'insensitive',
            },
          },
        ],
      },
      take: 10,
    });
  }

  public async create(data: Omit<Location, 'id'>): Promise<Location> {
    return this.prisma.location.create({ data });
  }

  public async update(id: number, data: Partial<Location>): Promise<Location> {
    // Remove id do objeto de update
    const updateData = { ...data };
    delete updateData.id;
    return this.prisma.location.update({ where: { id }, data: updateData });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.location.delete({ where: { id } });
  }

  public async getByIata(iata: string): Promise<Location | null> {
    return this.prisma.location.findFirst({ where: { iata } });
  }

  public async getByCityCode(cityCode: string): Promise<Location | null> {
    return this.prisma.location.findFirst({ where: { cityCode } });
  }

  public async upsert(data: Omit<Location, 'id'>): Promise<Location> {
    // Usa iata como chave única para upsert
    const existing = await this.prisma.location.findFirst({ where: { iata: data.iata } });
    if (existing) return existing;
    return this.prisma.location.create({ data });
  }
}

export default LocationRepository;
