import { inject, injectable } from 'inversify';

import { Types } from '@src/common/container/';
import IAmadeusProvider from '@providers/IAmadeusProvider';

@injectable()
class GetEuropeanDestinationService {
  @inject(Types.AmadeusProvider) private amadeusProvider: IAmadeusProvider;

  public async execute(): Promise<void> {
    const brazilianOrigin = ['SAO', 'RIO', 'REC', 'FOR'];
    const europeanDestinations = ['PAR', 'LIS', 'POR', 'LON', 'MUC', 'MAD'];

    // Store all flight offers
    // const allFlightOffers = [];

    const response = await this.amadeusProvider.flightCheapestDateSearch({
      origin: brazilianOrigin[0],
      destination: europeanDestinations[0],
      departureDate: '2025-06-01,2025-12-31',
      viewBy: 'WEEK',
      duration: '5,14',
    });

    console.log(response);
  }
}

export { GetEuropeanDestinationService };
