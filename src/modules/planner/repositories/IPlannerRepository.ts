import ICreatePlannerDTO from '@modules/planner/dtos/ICreatePlannerDTO';
import IUpdatePlannerDTO from '@modules/planner/dtos/IUpdatePlannerDTO';
import { Prisma, Planner } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

interface IPlannerRepository {
  create(data: ICreatePlannerDTO): Promise<Planner>;
  findById(id: number): Promise<Planner | null>;
  findCurrent(userId: number): Promise<Planner | null>;
  list(filters: Prisma.PlannerFindManyArgs<DefaultArgs>): Promise<Planner[]>;
  update(id: number, data: IUpdatePlannerDTO): Promise<void>;
  delete(id: number): Promise<void>;
}

export default IPlannerRepository;
