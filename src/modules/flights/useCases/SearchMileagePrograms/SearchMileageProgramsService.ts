import { Body, Post, Route, Tags, Security } from 'tsoa';
import { inject, injectable } from 'inversify';

import { SearchMileageProgramsType } from './SearchMileageProgramsSchema';
import { SearchMileageProgramsResponse } from './SearchMileageProgramsResponse';
import { Types } from '@src/common/container/';

import ISeatsAeroProvider from '@common/providers/SeatsAeroProvider/repositories/ISeatsAeroProvider';

@injectable()
@Route('flights/mileage/programs/search')
@Tags('Flight')
class SearchMileageProgramsService {
  @inject(Types.SeatsAeroProvider) private seatsAeroProvider: ISeatsAeroProvider;

  @Post('/')
  @Security('BearerAuth')
  public async execute(@Body() data: SearchMileageProgramsType): Promise<SearchMileageProgramsResponse> {
    const rawData = await this.seatsAeroProvider.searchFlights({
      origin_airport: data.origin,
      destination_airport: data.destination,
      start_date: data.departure,
      end_date: data.departure,
    });

    const response = rawData.data.map((search) => ({
      id: search.ID,
      originIata: search.Route.OriginAirport,
      destiantionIata: search.Route.DestinationAirport,
      source: search.Route.Source,
      currency: search.TaxesCurrency,
      economy: {
        price: search.YMileageCostRaw,
        taxes: search.YTotalTaxes,
      },
      premium: {
        price: search.WMileageCostRaw,
        taxes: search.WTotalTaxes,
      },
      business: {
        price: search.JMileageCostRaw,
        taxes: search.JTotalTaxes,
      },
      first: {
        price: search.FMileageCostRaw,
        taxes: search.FTotalTaxes,
      },
    }));

    return response;
  }
}

export { SearchMileageProgramsService };
