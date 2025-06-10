import { Body, OperationId, Post, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Permission } from '@prisma/client';

import { BuildPagination, PaginationResponse } from '@utils/PaginationUtils';
import { Types } from '@src/common/container';
import { ListPermissionType } from './ListPermissionSchema';

import IPermissionRepository from '@repositories/IPermissionRepository';

@injectable()
@Route('permissions')
@Tags('Permission')
class ListPermissionService {
  @inject(Types.PermissionRepository) private permissionRepository: IPermissionRepository;

  @Post('/list')
  @Security('BearerAuth')
  @OperationId('list_permission')
  public async execute(@Body() data: ListPermissionType): Promise<PaginationResponse<Permission>> {
    const permissions = await this.permissionRepository.list();
    return BuildPagination(permissions, data.dataControl.offset, 0);
  }
}

export { ListPermissionService };
