import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { injectable } from 'inversify';
import { getJson } from 'serpapi';

import { SearchFlightOfferDetailType } from './SearchFlightOfferDetailSchema';
import { SearchFlightOfferDetailResponse } from './SearchFlightOfferDetailResponse';
import Config from '@src/config';

@injectable()
@Route('flights/offers/search/detail')
@Tags('Flight')
class SearchFlightOfferDetailService {
  @Post('/')
  @Security('BearerAuth')
  @OperationId('search_flight_offer_detail')
  public async execute(@Body() data: SearchFlightOfferDetailType): Promise<SearchFlightOfferDetailResponse> {
    const response = await getJson({
      engine: 'google_flights',
      type: data.return ? '1' : '2',
      departure_id: data.origin,
      arrival_id: data.destination,
      outbound_date: data.departure,
      return_date: data.return,
      currency: 'BRL',
      hl: 'pt-BR',
      api_key: Config.serpapi.apiKey,
      booking_token: data.bookingToken,
    }).catch((err) => console.log(err)) as SearchFlightOfferDetailResponse;

    return response;
  }
}

export { SearchFlightOfferDetailService };
