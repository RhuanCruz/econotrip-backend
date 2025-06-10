import { injectable } from 'inversify';

import IPermissionRepository from '@modules/permission/repositories/IPermissionRepository';
import { PrismaClient, Permission } from '@prisma/client';

import ICreatePermissionDTO from '@src/modules/permission/dtos/ICreatePermissionDTO';
import IUpdatePermissionDTO from '@src/modules/permission/dtos/IUpdatePermissionDTO';
// import IListPermissionDTO from '@src/modules/permission/dtos/IListPermissionDTO';

@injectable()
class PermissionRepository implements IPermissionRepository {
  private prisma = new PrismaClient();

  public async create(data: ICreatePermissionDTO): Promise<Permission> {
    return this.prisma.permission.create({ data });
  }

  public async findById(id: number): Promise<Permission | null> {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  public async findByShort(short: string): Promise<Permission | null> {
    return this.prisma.permission.findUnique({ where: { short } });
  }

  public async list(): Promise<Permission[]> {
    return this.prisma.permission.findMany();
  }

  public async update(id: number, data: IUpdatePermissionDTO): Promise<void> {
    await this.prisma.permission.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<boolean> {
    return !!(await this.prisma.permission.delete({ where: { id } }));
  }

  public async getUserPermissions(userId: number): Promise<Permission[]> {
    return this.prisma.permission.findMany({ where: { OR: [{ users: { some: { userId } } }, { permissions: { some: { role: { users: { some: { userId } } } } } }] } });
  }
}

export default PermissionRepository;
