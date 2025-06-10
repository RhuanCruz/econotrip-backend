import { injectable } from 'inversify';
import { PrismaClient, FlightOfferSearchHistory } from '@prisma/client';

import IFlightOfferSearchHistoryRepository from '@src/modules/flights/repositories/IFlightOfferSearchHistoryRepository';
import ICreateFlightOfferSerachHisotryDTO from '@src/modules/flights/dtos/ICreateFlightOfferSerachHisotryDTO';

@injectable()
class FlightOfferSerachHisotryRepository implements IFlightOfferSearchHistoryRepository {
  private prisma = new PrismaClient();

  public async create(data: ICreateFlightOfferSerachHisotryDTO): Promise<FlightOfferSearchHistory> {
    return this.prisma.flightOfferSearchHistory.create({ data });
  }

  public async findById(id: number): Promise<FlightOfferSearchHistory | null> {
    return this.prisma.flightOfferSearchHistory.findUnique({ where: { id } });
  }

  public async findByUserId(userId: number): Promise<FlightOfferSearchHistory[]> {
    return this.prisma.flightOfferSearchHistory.findMany({ where: { userId } });
  }

  public async list(): Promise<FlightOfferSearchHistory[]> {
    return this.prisma.flightOfferSearchHistory.findMany();
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.flightOfferSearchHistory.delete({ where: { id } });
  }
}

export default FlightOfferSerachHisotryRepository;
