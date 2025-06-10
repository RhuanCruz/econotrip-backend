import { UserAction } from '@prisma/client';

interface IUserActionRepository {
  findById(id: number): Promise<UserAction | null>;
  findByShort(short: string): Promise<UserAction | null>;
  list(): Promise<UserAction[]>;
}

export default IUserActionRepository;
