import { injectable } from 'inversify';
import { PrismaClient, UserAction } from '@prisma/client';

import IUserActionRepository from '@modules/user/repositories/IUserActionRepository';

@injectable()
class UserActionRepository implements IUserActionRepository {
  private prisma = new PrismaClient();

  public async findById(id: number): Promise<UserAction | null> {
    return this.prisma.userAction.findUnique({ where: { id } });
  }

  public async findByShort(short: string): Promise<UserAction | null> {
    return this.prisma.userAction.findUnique({ where: { short } });
  }

  public async list(): Promise<UserAction[]> {
    return this.prisma.userAction.findMany();
  }
}

export default UserActionRepository;
