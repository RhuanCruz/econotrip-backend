import { Body, OperationId, Post, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';

import { BuildPagination, PaginationResponse } from '@utils/PaginationUtils';
import { Types } from '@src/common/container';
import { ListUserType } from './ListUserSchema';

import IUserRepository from '@repositories/IUserRepository';

@injectable()
@Route('users')
@Tags('User')
class ListUserService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @Post('/list')
  @Security('BearerAuth')
  @OperationId('list_user')
  public async execute(@Body() data: ListUserType): Promise<PaginationResponse<User>> {
    const users = await this.userRepository.list();
    return BuildPagination(users, data.dataControl.offset, 0);
  }
}

export { ListUserService };
