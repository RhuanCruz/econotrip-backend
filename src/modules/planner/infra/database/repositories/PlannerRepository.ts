import { injectable } from 'inversify';
import { Prisma, PrismaClient, Planner } from '@prisma/client';

import IPlannerRepository from '@modules/planner/repositories/IPlannerRepository';
import ICreatePlannerDTO from '@src/modules/planner/dtos/ICreatePlannerDTO';
import IUpdatePlannerDTO from '@src/modules/planner/dtos/IUpdatePlannerDTO';
import { DefaultArgs } from '@prisma/client/runtime/library';

@injectable()
class PlannerRepository implements IPlannerRepository {
  private prisma = new PrismaClient();

  public async create(data: ICreatePlannerDTO): Promise<Planner> {
    return this.prisma.planner.create({ data });
  }

  public async findById(id: number): Promise<Planner | null> {
    return this.prisma.planner.findUnique({ where: { id } });
  }

  public async findCurrent(userId: number): Promise<Planner | null> {
    return this.prisma.planner.findFirst({ where: { userId, current: true } });
  }

  public async list(filters: Prisma.PlannerFindManyArgs<DefaultArgs>): Promise<Planner[]> {
    return this.prisma.planner.findMany(filters);
  }

  public async update(id: number, data: IUpdatePlannerDTO): Promise<void> {
    await this.prisma.planner.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.planner.delete({ where: { id } });
  }
}

export default PlannerRepository;
