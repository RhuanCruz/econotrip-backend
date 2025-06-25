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

const ProviderContainer = new Container();

ProviderContainer.bind<ISkyScannerProvider>(ProviderTypes.SkyScannerProvider).to(SkyScannerProvider);
ProviderContainer.bind<IAmadeusProvider>(ProviderTypes.AmadeusProvider).to(AmadeusProvider);
ProviderContainer.bind<ISeatsAeroProvider>(ProviderTypes.SeatsAeroProvider).to(SeatsAeroProvider);
ProviderContainer.bind<IStorageProvider>(ProviderTypes.LocalStorageProvider).to(LocalStorageProvider);
ProviderContainer.bind<IRadarRoutineProvider>(ProviderTypes.RadarRoutineProvider).to(RadarRoutineProvider);

export default ProviderContainer;
