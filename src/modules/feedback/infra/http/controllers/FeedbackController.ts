import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@src/common/container';
import { ParseZodError } from '@src/common/errors';

import { CreateFeedbackService, CreateFeedbackSchema } from '@src/modules/feedback/useCases/CreateFeedback';
import { ListFeedbackService, ListFeedbackSchema } from '@src/modules/feedback/useCases/ListFeedback';

class FeedbackController {
  public async create(req: Request, res: Response): Promise<void> {
    const data = await CreateFeedbackSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(CreateFeedbackService).execute(data, req);
    res.status(StatusCodes.CREATED).json({
      feedback: response,
      message: 'Feedback enviado com sucesso! Agradecemos sua contribuição.',
    });
  }

  public async list(req: Request, res: Response): Promise<void> {
    const data = await ListFeedbackSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(ListFeedbackService).execute(data, req);
    res.status(StatusCodes.OK).json(response);
  }
}

export default FeedbackController;
