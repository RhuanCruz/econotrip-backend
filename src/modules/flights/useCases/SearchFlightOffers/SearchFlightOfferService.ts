import { Body, Post, Route, Tags, Security, OperationId, Request } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Request as ExpressRequest } from 'express';
import { getJson } from 'serpapi';

import { SearchFlightOffersType } from './SearchFlightOffersSchema';
import { SearchFlightOffersResponse } from './SearchFlightOffersResponse';
import { Types } from '@src/common/container/';

import IFlightOfferSerachHisotryRepository from '@modules/flights/repositories/IFlightOfferSearchHistoryRepository';
import Config from '@src/config';

@injectable()
@Route('flights/offers/search')
@Tags('Flight')
class SearchFlightOfferService {
  @inject(Types.FlighOfferSearchRepository) private flightOfferSerachHisotryRepository: IFlightOfferSerachHisotryRepository;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('search_flight_offers')
  public async execute(@Body() data: SearchFlightOffersType, @Request() req: ExpressRequest): Promise<SearchFlightOffersResponse> {
    const response = await getJson({
      engine: 'google_flights',
      type: data.return ? '1' : '2',
      departure_id: data.origin,
      arrival_id: data.destination,
      outbound_date: data.departure,
      return_date: data.return,
      departure_token: data.departureToken,
      currency: 'BRL',
      hl: 'pt-BR',
      api_key: Config.serpapi.apiKey,
    }) as SearchFlightOffersResponse;

    if (req.auth?.user) {
      await this.flightOfferSerachHisotryRepository.create({
        userId: req.auth.user,
        search: data,
      });
    }

    return response;
  }
}

export { SearchFlightOfferService };
