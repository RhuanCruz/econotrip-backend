import { Body, Route, Tags, Security, OperationId, Path, SuccessResponse, Patch } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { UpdateRoleType } from './UpdateRoleSchema';
import { Types } from '@src/common/container/';

import IRoleRepository from '@repositories/IRoleRepository';

@injectable()
@Route('roles')
@Tags('Role')
class UpdateRoleService {
  @inject(Types.RoleRepository) private roleRepository: IRoleRepository;

  @Patch('/{roleId}')
  @Security('BearerAuth')
  @OperationId('update_role')
  @SuccessResponse(204)
  public async execute(@Path() roleId: number, @Body() data: UpdateRoleType): Promise<void> {
    const role = await this.roleRepository.findById(roleId);
    if (!role) throw AppError.createAppError(Errors.ROLE_NOT_FOUND);

    if (data.short && data.short !== role.short && await this.roleRepository.findByShort(data.short)) {
      throw AppError.createAppError(Errors.ROLE_CONFLICT);
    }

    return this.roleRepository.update(roleId, data);
  }
}

export { UpdateRoleService };
