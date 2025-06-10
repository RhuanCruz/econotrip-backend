import { Delete, OperationId, Path, Route, Security, Tags, SuccessResponse } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IRoleRepository from '@repositories/IRoleRepository';

@injectable()
@Route('roles')
@Tags('Role')
class DeleteRoleService {
  @inject(Types.RoleRepository) private roleRepository: IRoleRepository;

  @Delete('/{roleId}')
  @Security('BearerAuth')
  @OperationId('delete_role')
  @SuccessResponse(204)
  public async execute(@Path() roleId: number): Promise<void> {
    const role = await this.roleRepository.findById(roleId);
    if (!role) throw AppError.createAppError(Errors.ROLE_NOT_FOUND);

    const deleteRes = await this.roleRepository.delete(roleId);
    if (!deleteRes) throw AppError.createAppError(Errors.ROLE_NOT_DELETED);
  }
}

export { DeleteRoleService };
