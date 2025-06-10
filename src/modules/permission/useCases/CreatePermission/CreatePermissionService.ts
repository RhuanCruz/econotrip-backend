import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Permission } from '@prisma/client';

import { AppError, Errors } from '@src/common/errors';
import { CreatePermissionType } from './CreatePermissionSchema';
import { Types } from '@src/common/container/';

import IPermissionRepository from '@repositories/IPermissionRepository';

@injectable()
@Route('permissions')
@Tags('Permission')
class CreatePermissionService {
  @inject(Types.PermissionRepository) private permissionRepository: IPermissionRepository;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('create_permission')
  public async execute(@Body() data: CreatePermissionType): Promise<Permission> {
    if (await this.permissionRepository.findByShort(data.short)) {
      throw AppError.createAppError(Errors.PERMISSION_CONFLICT);
    }

    return this.permissionRepository.create(data);
  }
}

export { CreatePermissionService };
