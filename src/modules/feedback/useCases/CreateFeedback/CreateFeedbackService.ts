import { Body, Post, Route, Tags, Security, OperationId, Request } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { Request as ExpressRequest } from 'express';
import { inject, injectable } from 'inversify';
import { Feedback } from '@prisma/client';

import { CreateFeedbackType } from './CreateFeedbackSchema';
import { Types } from '@src/common/container/';
import IFeedbackRepository from '@src/modules/feedback/repositories/IFeedbackRepository';
import IUserRepository from '@src/modules/user/repositories/IUserRepository';
import { AppError, Errors } from '@src/common/errors';

@injectable()
@Route('feedback')
@Tags('Feedback')
class CreateFeedbackService {
  @inject(Types.FeedbackRepository) private feedbackRepository: IFeedbackRepository;

  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('create_feedback')
  public async execute(@Body() data: CreateFeedbackType, @Request() req: ExpressRequest): Promise<Feedback> {
    if (!req.auth.user) throw AppError.createAppError(Errors.AUTH_UNAUTHORIZED);

    const user = await this.userRepository.findById(req.auth.user);
    if (!user) throw AppError.createAppError(Errors.AUTH_UNAUTHORIZED);

    // Validar rating apenas para categorias que fazem sentido
    if (data.rating && !['BUG', 'GENERAL', 'COMPLAINT'].includes(data.category)) {
      throw new AppError({
        statusCode: 400,
        message: 'Rating só pode ser fornecido para categorias: BUG, GENERAL, COMPLAINT',
      });
    }

    const feedback = await this.feedbackRepository.create({
      userId: req.auth.user,
      category: data.category,
      subject: data.subject,
      message: data.message,
      rating: data.rating,
      email: data.email || user.email,
      attachments: data.attachments,
      userAgent: req.get('User-Agent'),
      ipAddress: req.ip,
    });

    return instanceToInstance(feedback);
  }
}

export { CreateFeedbackService };
