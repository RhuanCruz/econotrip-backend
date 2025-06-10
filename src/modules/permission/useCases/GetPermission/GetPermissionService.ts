import { Get, OperationId, Path, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Permission } from '@prisma/client';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IPermissionRepository from '@repositories/IPermissionRepository';

@injectable()
@Route('permissions')
@Tags('Permission')
class GetPermissionService {
  @inject(Types.PermissionRepository) private permissionRepository: IPermissionRepository;

  @Get('/{permissionId}')
  @Security('BearerAuth')
  @OperationId('get_permission')
  public async execute(@Path() permissionId: number): Promise<Permission> {
    const permission = await this.permissionRepository.findById(permissionId);
    if (!permission) throw AppError.createAppError(Errors.PERMISSION_NOT_FOUND);

    return permission;
  }
}

export { GetPermissionService };
