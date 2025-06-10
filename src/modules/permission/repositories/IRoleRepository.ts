import ICreateRoleDTO from '@modules/permission/dtos/ICreateRoleDTO';
import IUpdateRoleDTO from '@modules/permission/dtos/IUpdateRoleDTO';
// import IListOrgDTO from '@modules/permission/dtos/IListRoleDTO';
import { Role, RolePermission } from '@prisma/client';

interface IRoleRepository {
  create(data: ICreateRoleDTO): Promise<Role>;
  findById(id: number): Promise<Role | null>;
  findByShort(name: string): Promise<Role | null>;
  list(): Promise<Role[]>;
  update(id: number, data: IUpdateRoleDTO): Promise<void>;
  delete(id: number): Promise<boolean>;
  addPermission(roleId: number, permissionId: number): Promise<void>;
  getPermission(roleId: number, permissionId: number): Promise<RolePermission | null>;
  removePermission(roleId: number, permissionId: number): Promise<void>;
  getUserRoles(userId: number): Promise<Role[]>;
}

export default IRoleRepository;
