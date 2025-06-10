import { Container } from 'inversify';
import RadarTypes from './types';

import RadarRepository from '@modules/radar/infra/database/repositories/RadarRepository';
import IRadarRepository from '@modules/radar/repositories/IRadarRepository';

const RadarContainer = new Container();

RadarContainer.bind<IRadarRepository>(RadarTypes.RadarRepository).to(RadarRepository);

export default RadarContainer;
