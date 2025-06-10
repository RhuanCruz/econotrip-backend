import { Get, OperationId, Path, Route, Security, Tags } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IUserRepository from '@repositories/IUserRepository';

@injectable()
@Route('users')
@Tags('User')
class GetUserService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @Get('/{userId}')
  @Security('BearerAuth')
  @OperationId('get_user')
  public async execute(@Path() userId: number): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw AppError.createAppError(Errors.USER_NOT_FOUND);

    return instanceToInstance(user);
  }
}

export { GetUserService };
