import { Container } from 'inversify';
import ProviderTypes from './types';

import ISkyScannerProvider from '@common/providers/SkyScannerProvider/repositories/ISkyScannerProvider';
import SkyScannerProvider from '@common/providers/SkyScannerProvider/implementations/SkyScannerProvider';

import IAmadeusProvider from '@common/providers/AmadeusProvider/repositories/IAmadeusProvider';
import AmadeusProvider from '@common/providers/AmadeusProvider/implementations/AmadeusProvider';

import ISeatsAeroProvider from '@common/providers/SeatsAeroProvider/repositories/ISeatsAeroProvider';
import SeatsAeroProvider from '@common/providers/SeatsAeroProvider/implementations/SeatsAeroProvider';

import IStorageProvider from '@common/providers/StorageProvider/repositories/IStorageProvider';
import LocalStorageProvider from '@common/providers/StorageProvider/implementations/LocalStorageProvider';

import IRadarRoutineProvider from '@common/providers/RadarRoutineProvider/repositories/IRadarRoutineProvider';
import RadarRoutineProvider from '@common/providers/RadarRoutineProvider/implementations/RadarRoutineProvider';

import IFlightScraperSkyProvider from '@common/providers/FlightScraperSkyProvider/repositories/IFlightScraperSkyProvider';
import FlightScraperSkyProvider from '@common/providers/FlightScraperSkyProvider/implementations/FlightScraperSkyProvider';

import IEmailProvider from '@common/providers/EmailProvider/repositories/IEmailProvider';
import EmailProvider from '@common/providers/EmailProvider/implementations/EmailProvider';

import IGeoNamesProvider from '@common/providers/GeoNamesProvider/repositories/IGeoNamesProvider';
import GeoNamesProvider from '@common/providers/GeoNamesProvider/implementations/GeoNamesProvider';

import ITripAdvisorProvider from '@common/providers/TripAdvisorProvider/repositories/ITripAdvisorProvider';
import TripAdvisorProvider from '@common/providers/TripAdvisorProvider/implementations/TripAdvisorProvider';

import IGooglePlacesProvider from '@common/providers/GooglePlacesProvider/repositories/IGooglePlacesProvider';
import GooglePlacesProvider from '@common/providers/GooglePlacesProvider/implementations/GooglePlacesProvider';

const ProviderContainer = new Container();

ProviderContainer.bind<ISkyScannerProvider>(ProviderTypes.SkyScannerProvider).to(SkyScannerProvider);
ProviderContainer.bind<IAmadeusProvider>(ProviderTypes.AmadeusProvider).to(AmadeusProvider);
ProviderContainer.bind<ISeatsAeroProvider>(ProviderTypes.SeatsAeroProvider).to(SeatsAeroProvider);
ProviderContainer.bind<IStorageProvider>(ProviderTypes.LocalStorageProvider).to(LocalStorageProvider);
ProviderContainer.bind<IRadarRoutineProvider>(ProviderTypes.RadarRoutineProvider).to(RadarRoutineProvider);
ProviderContainer.bind<IFlightScraperSkyProvider>(ProviderTypes.FlightScraperSkyProvider).to(FlightScraperSkyProvider);
ProviderContainer.bind<IEmailProvider>(ProviderTypes.EmailProvider).to(EmailProvider);
ProviderContainer.bind<IGeoNamesProvider>(ProviderTypes.GeoNamesProvider).to(GeoNamesProvider);
ProviderContainer.bind<ITripAdvisorProvider>(ProviderTypes.TripAdvisorProvider).to(TripAdvisorProvider);
ProviderContainer.bind<IGooglePlacesProvider>(ProviderTypes.GooglePlacesProvider).to(GooglePlacesProvider);

export default ProviderContainer;
