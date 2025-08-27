import { inject, injectable } from 'inversify';
import { Types } from '@src/common/container';
import ILocationRepository from '@modules/location/repositories/ILocationRepository';
import { StandardLocation } from '@modules/location/useCases/ListLocation/locationMapper';

@injectable()
class PersistLocationsService {
  @inject(Types.LocationRepository) private locationRepository: ILocationRepository;

  public persist(locations: StandardLocation[]): void {
    // Roda em background, sem await
    locations.forEach((loc) => {
      if (!loc.code) return;
      this.locationRepository.upsert({
        name: loc.name,
        iata: loc.code,
        cityCode: loc.city,
        country: loc.country || '',
        cityName: loc.city,
        type: loc.type || '',
        timezone: null,
        cordinateLon: null,
        cordinateLat: null,
        createdAt: new Date(),
      });
    });
  }
}

export default PersistLocationsService;
