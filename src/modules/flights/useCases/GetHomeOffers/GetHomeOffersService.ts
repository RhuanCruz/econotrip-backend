/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Tags, Security, OperationId, Request, Post } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Request as ExpressRequest } from 'express';

import { GetHomeOfferResponse } from './GetHomeOfferResponse';
import { Types } from '@src/common/container/';

import IStorageProvider from '@providers/IStorageProvider';
import Config from '@src/config';

@injectable()
@Route('flights/offers/home')
@Tags('Flight')
class GetHomeOffersService {
  @inject(Types.LocalStorageProvider) private localStorageProvider: IStorageProvider;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('search_offers_home')
  public async execute(@Request() _req: ExpressRequest): Promise<GetHomeOfferResponse> {
    const basepath = Config.storage.flightsData;
    const filename = 'overview_latest.json';
    const data = await this.localStorageProvider.read(`${basepath}/${filename}`);
    const json: GetHomeOfferResponse = JSON.parse(data.toString('utf8'));
    return json;
  }
}

export { GetHomeOffersService };
