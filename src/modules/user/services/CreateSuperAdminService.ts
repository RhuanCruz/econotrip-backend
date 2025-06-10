import Argon2 from 'argon2';

import { inject, injectable } from 'inversify';
import { Types } from '@src/common/container/';

import IUserRepository from '@repositories/IUserRepository';

interface IData {
  email: string;
  password: string;
}

@injectable()
class CreateSuperAdminService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  public async execute({ email, password }: IData): Promise<void> {
    // Admin user already created
    if (await this.userRepository.findByEmail(email)) {
      return;
    }

    const user = await this.userRepository.create({
      login: email,
      email,
      phone: '83999999999',
      cpf: '00000000000',
      birthdate: new Date('2000-01-01').toISOString(),
      gender: 'OTHER',
      admin: true,
    });

    const passwordHash = await Argon2.hash(password);
    await this.userRepository.createPassword(user.id, passwordHash);
  }
}

export { CreateSuperAdminService };
