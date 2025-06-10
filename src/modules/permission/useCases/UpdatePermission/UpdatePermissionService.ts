import { Body, Route, Tags, Security, OperationId, Path, SuccessResponse, Patch } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { UpdatePermissionType } from './UpdatePermissionSchema';
import { Types } from '@src/common/container/';

import IPermissionRepository from '@repositories/IPermissionRepository';

@injectable()
@Route('permissions')
@Tags('Permission')
class UpdatePermissionService {
  @inject(Types.PermissionRepository) private permissionRepository: IPermissionRepository;

  @Patch('/{permissionId}')
  @Security('BearerAuth')
  @OperationId('update_permission')
  @SuccessResponse(204)
  public async execute(@Path() permissionId: number, @Body() data: UpdatePermissionType): Promise<void> {
    const permission = await this.permissionRepository.findById(permissionId);
    if (!permission) throw AppError.createAppError(Errors.PERMISSION_NOT_FOUND);

    if (data.short && data.short !== permission.short && await this.permissionRepository.findByShort(data.short)) {
      throw AppError.createAppError(Errors.PERMISSION_CONFLICT);
    }

    return this.permissionRepository.update(permissionId, data);
  }
}

export { UpdatePermissionService };
