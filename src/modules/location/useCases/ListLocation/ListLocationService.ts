import { Body, OperationId, Post, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';

import { Types } from '@src/common/container';
import { ListLocationType } from './ListLocationSchema';
import { mapListLocationResponse, StandardLocationResponse } from './locationMapper';

import ILocationRepository from '../../repositories/ILocationRepository';

@injectable()
@Route('locations')
@Tags('Location')
class ListLocationService {
  @inject(Types.LocationRepository) private locationRepository: ILocationRepository;

  @Post('/list')
  @Security('BearerAuth')
  @OperationId('list_location')
  public async execute(@Body() data: ListLocationType): Promise<StandardLocationResponse> {
    const response = await this.locationRepository.listByKey(data.keyword);
    const mapped = mapListLocationResponse(response, 'local');
    return mapped;
  }
}

export { ListLocationService };
