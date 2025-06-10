import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@src/common/container';
import { ParseZodError } from '@src/common/errors';

import { SearchFlightOfferDetailService, SearchFlightOfferDetailSchema } from '@src/modules/flights/useCases/SearchFlightOfferDetail';
import { SearchFlightOfferService, SearchFlightOffersSchema } from '@src/modules/flights/useCases/SearchFlightOffers';
import { SearchFlightsByMileageService, SearchFlightsByMileageSchema } from '@src/modules/flights/useCases/SearchFlightsByMileage';
import { SearchMileageProgramsService, SearchMileageProgramsSchema } from '@src/modules/flights/useCases/SearchMileagePrograms';
import { GetHomeOffersService } from '@src/modules/flights/useCases/GetHomeOffers';
import { GetTripByMileageService } from '@src/modules/flights/useCases/GetTripsByMileage';

class FlightController {
  public async getOffersToHome(req: Request, res: Response): Promise<void> {
    const response = await AppContainer.resolve(GetHomeOffersService).execute(req);
    res.status(StatusCodes.OK).json(response);
  }

  public async searchFlightOffer(req: Request, res: Response): Promise<void> {
    const data = await SearchFlightOffersSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(SearchFlightOfferService).execute(data, req);
    res.status(StatusCodes.OK).json(response);
  }

  public async searchFlightOfferDetail(req: Request, res: Response): Promise<void> {
    const data = await SearchFlightOfferDetailSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(SearchFlightOfferDetailService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async searchFlightByMileage(req: Request, res: Response): Promise<void> {
    const data = await SearchFlightsByMileageSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(SearchFlightsByMileageService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async searchMileagePrograms(req: Request, res: Response): Promise<void> {
    const data = await SearchMileageProgramsSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(SearchMileageProgramsService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async getTripsByMileage(req: Request, res: Response): Promise<void> {
    const { tripId } = req.params;

    const response = await AppContainer.resolve(GetTripByMileageService).execute(tripId);
    res.status(StatusCodes.OK).json(response);
  }
}

export default FlightController;
