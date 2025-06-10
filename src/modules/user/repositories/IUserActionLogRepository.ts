import { UserActionLog } from '@prisma/client';
import ICreateUserActionLogDTO from '@modules/user/dtos/ICreateUserActionLogDTO';

interface IUserActionLogRepository {
  create(data: ICreateUserActionLogDTO): Promise<UserActionLog>;
  findById(id: number): Promise<UserActionLog | null>;
  list(): Promise<UserActionLog[]>;
}

export default IUserActionLogRepository;
