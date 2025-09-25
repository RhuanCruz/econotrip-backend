import { injectable } from 'inversify';
import { Prisma, PrismaClient, Radar } from '@prisma/client';

import IRadarRepository from '@modules/radar/repositories/IRadarRepository';
import ICreateRadarDTO from '@src/modules/radar/dtos/ICreateRadarDTO';
import IUpdateRadarDTO from '@src/modules/radar/dtos/IUpdateRadarDTO';
import { DefaultArgs } from '@prisma/client/runtime/library';

type RadarWithUser = Prisma.RadarGetPayload<{
  include: {
    user: true
  }
}>;

@injectable()
class RadarRepository implements IRadarRepository {
  private prisma = new PrismaClient();

  public async create(data: ICreateRadarDTO): Promise<Radar> {
    return this.prisma.radar.create({ data });
  }

  public async findById(id: number): Promise<Radar | null> {
    return this.prisma.radar.findUnique({ where: { id } });
  }

  public async list(filters: Prisma.RadarFindManyArgs<DefaultArgs>): Promise<Radar[]> {
    return this.prisma.radar.findMany(filters);
  }

  public async update(id: number, data: IUpdateRadarDTO): Promise<void> {
    await this.prisma.radar.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.radar.delete({ where: { id } });
  }

  public async listToNotify(): Promise<RadarWithUser[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.radar.findMany({
      where: {
        RadarNotification: {
          none: {
            notification: {
              sentAt: {
                gte: today,
              },
            },
          },
        },
      },
      include: {
        user: true,
      },
      distinct: [
        'userId',
      ],
    });
  }
}

export default RadarRepository;
