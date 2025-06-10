import { Post, Route, Tags, Security, OperationId, Path } from 'tsoa';
import { inject, injectable } from 'inversify';

import { GetTripByMileageResponse } from './GetTripByMileageResponse';
import { Types } from '@src/common/container/';

import ISeatsAeroProvider from '@common/providers/SeatsAeroProvider/repositories/ISeatsAeroProvider';

@injectable()
@Route('flights/mileage')
@Tags('Flight')
class GetTripByMileageService {
  @inject(Types.SeatsAeroProvider) private seatsAeroProvider: ISeatsAeroProvider;

  @Post('/{tripId}')
  @Security('BearerAuth')
  @OperationId('get_trips_by_mileage')
  public async execute(@Path() tripId: string): Promise<GetTripByMileageResponse> {
    const response = await this.seatsAeroProvider.getTrips(tripId);
    return response;
  }
}

export { GetTripByMileageService };
