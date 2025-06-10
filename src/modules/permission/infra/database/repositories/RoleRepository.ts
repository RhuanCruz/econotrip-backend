import { injectable } from 'inversify';

import IRoleRepository from '@modules/permission/repositories/IRoleRepository';
import { PrismaClient, Role, RolePermission } from '@prisma/client';

import ICreateRoleDTO from '@src/modules/permission/dtos/ICreateRoleDTO';
import IUpdateRoleDTO from '@src/modules/permission/dtos/IUpdateRoleDTO';
// import IListRoleDTO from '@src/modules/permission/dtos/IListRoleDTO';

@injectable()
class RoleRepository implements IRoleRepository {
  private prisma = new PrismaClient();

  public async create(data: ICreateRoleDTO): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  public async findById(id: number): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  public async findByShort(short: string): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { short } });
  }

  public async list(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  public async update(id: number, data: IUpdateRoleDTO): Promise<void> {
    await this.prisma.role.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<boolean> {
    return !!(await this.prisma.role.delete({ where: { id } }));
  }

  public async getUserRoles(userId: number): Promise<Role[]> {
    return this.prisma.role.findMany({ where: { users: { some: { userId } } } });
  }

  public async addPermission(roleId: number, permissionId: number): Promise<void> {
    await this.prisma.rolePermission.create({ data: { roleId, permissionId } });
  }

  public async getPermission(roleId: number, permissionId: number): Promise<RolePermission | null> {
    return this.prisma.rolePermission.findUnique({ where: { roleId_permissionId: { roleId, permissionId } } });
  }

  public async removePermission(roleId: number, permissionId: number): Promise<void> {
    await this.prisma.rolePermission.delete({ where: { roleId_permissionId: { roleId, permissionId } } });
  }
}

export default RoleRepository;
