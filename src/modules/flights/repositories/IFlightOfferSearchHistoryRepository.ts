import ICreateFlightOfferSerachHisotryDTO from '@modules/flights/dtos/ICreateFlightOfferSerachHisotryDTO';
import { FlightOfferSearchHistory } from '@prisma/client';

interface IFlightOfferSerachHisotryRepository {
  create(data: ICreateFlightOfferSerachHisotryDTO): Promise<FlightOfferSearchHistory>;
  findById(id: number): Promise<FlightOfferSearchHistory | null>;
  findByUserId(userId: number): Promise<FlightOfferSearchHistory[]>;
  list(): Promise<FlightOfferSearchHistory[]>;
  delete(id: number): Promise<void>;
}

export default IFlightOfferSerachHisotryRepository;
