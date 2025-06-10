import { Body, Route, Tags, Security, OperationId, Path, Delete } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { UnlinkPermissionType } from './UnlinkPermissionSchema';
import { Types } from '@src/common/container/';

import IPermissionRepository from '@repositories/IPermissionRepository';
import IRoleRepository from '@repositories/IRoleRepository';

@injectable()
@Route('roles')
@Tags('Role')
class UnlinkPermissionService {
  @inject(Types.RoleRepository) private roleRepository: IRoleRepository;

  @inject(Types.PermissionRepository) private permissionRepository: IPermissionRepository;

  @Delete('/{roleId}/permissions')
  @Security('BearerAuth')
  @OperationId('unlink_permission')
  public async execute(@Path() roleId: number, @Body() data: UnlinkPermissionType): Promise<void> {
    const role = await this.roleRepository.findById(roleId);
    if (!role) throw AppError.createAppError(Errors.ROLE_NOT_FOUND);

    await Promise.all(data.permissions.map(async (permissionId) => {
      const permission = await this.permissionRepository.findById(permissionId);
      if (!permission) return;

      await this.roleRepository.removePermission(role.id, permission.id);
    }));
  }
}

export { UnlinkPermissionService };
