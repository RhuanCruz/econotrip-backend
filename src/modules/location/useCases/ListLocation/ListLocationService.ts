import { Body, OperationId, Post, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';

import { Types } from '@src/common/container';
import { ListLocationType } from './ListLocationSchema';

import ILocationRepository from '@src/modules/location/repositories/ILocationRepository';
import { Location } from '@prisma/client';

@injectable()
@Route('locations')
@Tags('Location')
class ListLocationService {
  @inject(Types.LocationRepository) private locationRepository: ILocationRepository;

  @Post('/list')
  @Security('BearerAuth')
  @OperationId('list_location')
  public async execute(@Body() data: ListLocationType): Promise<Array<Location>> {
    const locations = await this.locationRepository.listByKey(data.keyword);
    return locations;
  }
}

export { ListLocationService };
