import { Feedback } from '@prisma/client';
import ICreateFeedbackDTO from '../dtos/ICreateFeedbackDTO';
import IListFeedbackDTO from '../dtos/IListFeedbackDTO';

interface IFeedbackRepository {
  create(data: ICreateFeedbackDTO): Promise<Feedback>;
  findById(id: number): Promise<Feedback | null>;
  list(params: IListFeedbackDTO): Promise<Feedback[]>;
  count(params: IListFeedbackDTO): Promise<number>;
  updateStatus(id: number, status: string): Promise<Feedback>;
}

export default IFeedbackRepository;
