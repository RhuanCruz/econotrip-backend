import { Delete, OperationId, Path, Route, Security, Tags, SuccessResponse } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IPermissionRepository from '@repositories/IPermissionRepository';

@injectable()
@Route('permissions')
@Tags('Permission')
class DeletePermissionService {
  @inject(Types.PermissionRepository) private permissionRepository: IPermissionRepository;

  @Delete('/{permissionId}')
  @Security('BearerAuth')
  @OperationId('delete_permission')
  @SuccessResponse(204)
  public async execute(@Path() permissionId: number): Promise<void> {
    const permission = await this.permissionRepository.findById(permissionId);
    if (!permission) throw AppError.createAppError(Errors.PERMISSION_NOT_FOUND);

    const deleteRes = await this.permissionRepository.delete(permissionId);
    if (!deleteRes) throw AppError.createAppError(Errors.PERMISSION_CONFLICT);
  }
}

export { DeletePermissionService };
