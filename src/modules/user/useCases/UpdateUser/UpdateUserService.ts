import Argon2 from 'argon2';

import { Body, Route, Tags, Security, OperationId, Path, SuccessResponse, Patch } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { UpdateUserType } from './UpdateUserSchema';
import { Types } from '@src/common/container/';

import IUserRepository from '@repositories/IUserRepository';

@injectable()
@Route('users')
@Tags('User')
class UpdateUserService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @Patch('/{userId}')
  @Security('BearerAuth')
  @OperationId('update_user')
  @SuccessResponse(204)
  public async execute(@Path() userId: number, @Body() data: UpdateUserType): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw AppError.createAppError(Errors.USER_NOT_FOUND);

    if (data.login && data.login !== user.login && await this.userRepository.findByLogin(data.login)) {
      throw AppError.createAppError(Errors.USER_LOGIN_CONFLICT);
    }

    if (data.email && data.email !== user.email && await this.userRepository.findByEmail(data.email)) {
      throw AppError.createAppError(Errors.USER_EMAIL_CONFLICT);
    }

    const passwordHash = data.password ? await Argon2.hash(data.password) : undefined;
    if (passwordHash) await this.userRepository.updatePassword(user.id, passwordHash);

    return this.userRepository.update(userId, { ...data });
  }
}

export { UpdateUserService };
