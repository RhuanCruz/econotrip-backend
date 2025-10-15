import { injectable } from 'inversify';
import { Feedback, PrismaClient } from '@prisma/client';
import IFeedbackRepository from '@modules/feedback/repositories/IFeedbackRepository';
import ICreateFeedbackDTO from '@modules/feedback/dtos/ICreateFeedbackDTO';
import IListFeedbackDTO from '@modules/feedback/dtos/IListFeedbackDTO';

@injectable()
class FeedbackRepository implements IFeedbackRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: ICreateFeedbackDTO): Promise<Feedback> {
    const feedback = await this.prisma.feedback.create({
      data: {
        userId: data.userId,
        category: data.category,
        subject: data.subject,
        message: data.message,
        rating: data.rating,
        email: data.email,
        attachments: data.attachments || [],
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        status: 'PENDING',
      },
    });

    return feedback;
  }

  async findById(id: number): Promise<Feedback | null> {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },
    });

    return feedback;
  }

  async list(params: IListFeedbackDTO): Promise<Feedback[]> {
    const where: any = {};

    if (params.userId) {
      where.userId = params.userId;
    }

    if (params.category) {
      where.category = params.category;
    }

    if (params.status) {
      where.status = params.status;
    }

    const feedbacks = await this.prisma.feedback.findMany({
      where,
      skip: params.offset || 0,
      take: params.limit || 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },
    });

    return feedbacks;
  }

  async count(params: IListFeedbackDTO): Promise<number> {
    const where: any = {};

    if (params.userId) {
      where.userId = params.userId;
    }

    if (params.category) {
      where.category = params.category;
    }

    if (params.status) {
      where.status = params.status;
    }

    const count = await this.prisma.feedback.count({ where });

    return count;
  }

  async updateStatus(id: number, status: string): Promise<Feedback> {
    const feedback = await this.prisma.feedback.update({
      where: { id },
      data: { status },
    });

    return feedback;
  }
}

export default FeedbackRepository;
