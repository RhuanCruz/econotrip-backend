import { Body, Post, Route, Tags, Security, OperationId, Path } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { LinkPermissionType } from './LinkPermissionSchema';
import { Types } from '@src/common/container/';

import IPermissionRepository from '@repositories/IPermissionRepository';
import IRoleRepository from '@repositories/IRoleRepository';

@injectable()
@Route('roles')
@Tags('Role')
class LinkPermissionService {
  @inject(Types.RoleRepository) private roleRepository: IRoleRepository;

  @inject(Types.PermissionRepository) private permissionRepository: IPermissionRepository;

  @Post('/{roleId}/permissions')
  @Security('BearerAuth')
  @OperationId('link_permission')
  public async execute(@Path() roleId: number, @Body() data: LinkPermissionType): Promise<void> {
    const role = await this.roleRepository.findById(roleId);
    if (!role) throw AppError.createAppError(Errors.ROLE_NOT_FOUND);

    await Promise.all(data.permissions.map(async (permissionId) => {
      const permission = await this.permissionRepository.findById(permissionId);
      if (!permission) return;

      await this.roleRepository.addPermission(role.id, permission.id);
    }));
  }
}

export { LinkPermissionService };
