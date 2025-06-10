import { Get, OperationId, Path, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IRoleRepository from '@repositories/IRoleRepository';
import { Role } from '@prisma/client';

@injectable()
@Route('roles')
@Tags('Role')
class GetRoleService {
  @inject(Types.RoleRepository) private roleRepository: IRoleRepository;

  @Get('/{roleId}')
  @Security('BearerAuth')
  @OperationId('get_role')
  public async execute(@Path() roleId: number): Promise<Role> {
    const role = await this.roleRepository.findById(roleId);
    if (!role) throw AppError.createAppError(Errors.ROLE_NOT_FOUND);

    return role;
  }
}

export { GetRoleService };
