import { Delete, OperationId, Path, Route, Security, Tags, SuccessResponse } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IUserRepository from '@repositories/IUserRepository';

@injectable()
@Route('users')
@Tags('User')
class DeleteUserService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @Delete('/{userId}')
  @Security('BearerAuth')
  @OperationId('delete_user')
  @SuccessResponse(204)
  public async execute(@Path() userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw AppError.createAppError(Errors.USER_NOT_FOUND);

    await this.userRepository.delete(userId).catch(() => {
      throw AppError.createAppError(Errors.USER_NOT_DELETED);
    });
  }
}

export { DeleteUserService };
