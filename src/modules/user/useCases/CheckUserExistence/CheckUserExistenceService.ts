import { Body, OperationId, Post, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Types } from '@src/common/container/';

import IUserRepository from '@repositories/IUserRepository';
import { CheckUserExistenceType } from './CheckUserExistenceSchema';
import { CheckUserExistenceResponse } from './CheckUserExistenceResponse';

@injectable()
@Route('users')
@Tags('User')
class CheckUserExistenceService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @Post('/check')
  @Security('BearerAuth')
  @OperationId('check_user_existence')
  public async execute(@Body() data: CheckUserExistenceType): Promise<CheckUserExistenceResponse> {
    const user = await this.userRepository.findByEmail(data.email);

    return {
      exists: user !== null,
    };
  }
}

export { CheckUserExistenceService };
