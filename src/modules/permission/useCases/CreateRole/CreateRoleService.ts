import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Role } from '@prisma/client';

import { AppError, Errors } from '@src/common/errors';
import { CreateRoleType } from './CreateRoleSchema';
import { Types } from '@src/common/container/';

import IRoleRepository from '@repositories/IRoleRepository';

@injectable()
@Route('roles')
@Tags('Role')
class CreateRoleService {
  @inject(Types.RoleRepository) private roleRepository: IRoleRepository;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('create_role')
  public async execute(@Body() data: CreateRoleType): Promise<Role> {
    if (await this.roleRepository.findByShort(data.short)) {
      throw AppError.createAppError(Errors.ROLE_CONFLICT);
    }

    return this.roleRepository.create(data);
  }
}

export { CreateRoleService };
