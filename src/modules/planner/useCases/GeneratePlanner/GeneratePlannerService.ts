import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { injectable } from 'inversify';

import { GeneratePlannerType } from './GeneratePlannerSchema';

import { AITravelEstimator, EstimativaViagem } from './AITravelEstimator';
import Config from '@src/config';

@injectable()
@Route('planners')
@Tags('Planner')
class GeneratePlannerService {
  @Post('/generate')
  @Security('BearerAuth')
  @OperationId('generate_planner')
  public async execute(@Body() data: GeneratePlannerType): Promise<EstimativaViagem> {
    const estimator = new AITravelEstimator({
      apiKey: Config.openai.apiKey,
      provider: 'openai',
    });

    const response = await estimator.gerarEstimativa({
      destino: data.destination,
      estiloViagem: 'econômico',
      numerosPessoas: data.amountPeople ?? 1,
      origem: data.origin,
      inicio: data.start,
      duracao: data.duration,
    });

    return response;
  }
}

export { GeneratePlannerService };
