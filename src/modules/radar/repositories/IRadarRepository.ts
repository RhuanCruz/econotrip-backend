import ICreateRadarDTO from '@modules/radar/dtos/ICreateRadarDTO';
import IUpdateRadarDTO from '@modules/radar/dtos/IUpdateRadarDTO';
import { Prisma, Radar } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

type RadarWithUser = Prisma.RadarGetPayload<{
  include: {
    user: true
  }
}>;

interface IRadarRepository {
  create(data: ICreateRadarDTO): Promise<Radar>;
  findById(id: number): Promise<Radar | null>;
  list(filters: Prisma.RadarFindManyArgs<DefaultArgs>): Promise<Radar[]>;
  update(id: number, data: IUpdateRadarDTO): Promise<void>;
  delete(id: number): Promise<void>;
  listToNotify(): Promise<RadarWithUser[]>;
}

export default IRadarRepository;
