import { Body, OperationId, Post, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Role } from '@prisma/client';

import { BuildPagination, PaginationResponse } from '@utils/PaginationUtils';
import { Types } from '@src/common/container';
import { ListRoleType } from './ListRoleSchema';

import IRoleRepository from '@repositories/IRoleRepository';

@injectable()
@Route('roles')
@Tags('Role')
class ListRoleService {
  @inject(Types.RoleRepository) private roleRepository: IRoleRepository;

  @Post('/list')
  @Security('BearerAuth')
  @OperationId('list_role')
  public async execute(@Body() data: ListRoleType): Promise<PaginationResponse<Role>> {
    const roles = await this.roleRepository.list();
    return BuildPagination(roles, data.dataControl.offset, 0);
  }
}

export { ListRoleService };
