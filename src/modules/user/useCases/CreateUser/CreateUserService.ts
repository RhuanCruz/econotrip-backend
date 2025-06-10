import Argon2 from 'argon2';

import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';

import { AppError, Errors } from '@src/common/errors';
import { CreateUserType } from './CreateUserSchema';
import { Types } from '@src/common/container/';

import IUserRepository from '@repositories/IUserRepository';
import IRoleRepository from '@repositories/IRoleRepository';

@injectable()
@Route('users')
@Tags('User')
class CreateUserService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @inject(Types.RoleRepository) private roleRepository: IRoleRepository;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('create_user')
  public async execute(@Body() data: CreateUserType): Promise<User> {
    if (data.login && await this.userRepository.findByLogin(data.login)) {
      throw AppError.createAppError(Errors.USER_LOGIN_CONFLICT);
    }

    if (await this.userRepository.findByEmail(data.email)) {
      throw AppError.createAppError(Errors.USER_EMAIL_CONFLICT);
    }

    const user = await this.userRepository.create({
      login: data.login ?? data.email,
      email: data.email,
      fullname: data.fullname,
      phone: data.phone,
      cpf: data.cpf,
      avatar: data.avatar,
      birthdate: data.birthdate,
      gender: data.gender,
    });

    const passwordHash = await Argon2.hash(data.password);
    await this.userRepository.createPassword(user.id, passwordHash);

    if (data.roles) {
      await Promise.all(data.roles.map(async (roleName) => {
        const role = await this.roleRepository.findByShort(roleName);
        if (!role) throw AppError.createAppError(Errors.ROLE_NOT_FOUND);

        await this.userRepository.assignRole(user.id, role.id);
      }));
    }

    return instanceToInstance(user);
  }
}

export { CreateUserService };
