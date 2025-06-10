import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { injectable } from 'inversify';
import OpenAI from 'openai';

import { GeneratePlannerType } from './GeneratePlannerSchema';

import { getItneraryPrompt } from './prompts';
import { AppError, Errors } from '@src/common/errors';
import Config from '@src/config';

@injectable()
@Route('planners')
@Tags('Planner')
class GeneratePlannerService {
  @Post('/generate')
  @Security('BearerAuth')
  @OperationId('generate_planner')
  public async execute(@Body() data: GeneratePlannerType): Promise<void> {
    const openai = new OpenAI({
      apiKey: Config.openai.apiKey,
    });

    const prompt = getItneraryPrompt(data);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;
    if (!responseText) throw AppError.createAppError(Errors.UNDOCUMENTED_ERROR);

    const itinerary = JSON.parse(responseText);

    return itinerary;
  }
}

export { GeneratePlannerService };
