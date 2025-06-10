import { injectable } from 'inversify';
import { PrismaClient, UserActionLog } from '@prisma/client';

import IUserActionLogRepository from '@modules/user/repositories/IUserActionLogRepository';
import ICreateUserActionLogDTO from '@src/modules/user/dtos/ICreateUserActionLogDTO';

@injectable()
class UserActionLogRepository implements IUserActionLogRepository {
  private prisma = new PrismaClient();

  public async create(data: ICreateUserActionLogDTO): Promise<UserActionLog> {
    return this.prisma.userActionLog.create({ data });
  }

  public async findById(id: number): Promise<UserActionLog | null> {
    return this.prisma.userActionLog.findUnique({ where: { id } });
  }

  public async list(): Promise<UserActionLog[]> {
    return this.prisma.userActionLog.findMany();
  }
}

export default UserActionLogRepository;
