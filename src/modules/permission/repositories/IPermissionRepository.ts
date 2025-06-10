import ICreatePermissionDTO from '@modules/permission/dtos/ICreatePermissionDTO';
import IUpdatePermissionDTO from '@modules/permission/dtos/IUpdatePermissionDTO';
// import IListOrgDTO from '@modules/permission/dtos/IListPermissionDTO';
import { Permission } from '@prisma/client';

interface IPermissionRepository {
  create(data: ICreatePermissionDTO): Promise<Permission>;
  findById(id: number): Promise<Permission | null>;
  findByShort(name: string): Promise<Permission | null>;
  list(): Promise<Permission[]>;
  update(id: number, data: IUpdatePermissionDTO): Promise<void>;
  delete(id: number): Promise<boolean>;
  getUserPermissions(userId: number): Promise<Permission[]>;
}

export default IPermissionRepository;
