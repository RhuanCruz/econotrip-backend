import { Body, Post, Route, Tags, Security, OperationId, Request } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { Request as ExpressRequest } from 'express';
import { inject, injectable } from 'inversify';

import { ListFeedbackType } from './ListFeedbackSchema';
import { Types } from '@src/common/container/';
import IFeedbackRepository from '@src/modules/feedback/repositories/IFeedbackRepository';
import { AppError, Errors } from '@src/common/errors';

interface ListFeedbackResponse {
  records: any[];
  metadata: {
    total: number;
    items: number;
    offset: number;
  };
}

@injectable()
@Route('feedback')
@Tags('Feedback')
class ListFeedbackService {
  @inject(Types.FeedbackRepository) private feedbackRepository: IFeedbackRepository;

  @Post('/list')
  @Security('BearerAuth')
  @OperationId('list_feedback')
  public async execute(@Body() data: ListFeedbackType, @Request() req: ExpressRequest): Promise<ListFeedbackResponse> {
    if (!req.auth.user) throw AppError.createAppError(Errors.AUTH_UNAUTHORIZED);

    const feedbacks = await this.feedbackRepository.list({
      userId: req.auth.user,
      category: data.category,
      status: data.status,
      offset: data.offset || 0,
      limit: data.limit || 10,
    });

    const total = await this.feedbackRepository.count({
      userId: req.auth.user,
      category: data.category,
      status: data.status,
    });

    return {
      records: instanceToInstance(feedbacks),
      metadata: {
        total,
        items: feedbacks.length,
        offset: data.offset || 0,
      },
    };
  }
}

export { ListFeedbackService };
