import { Container } from 'inversify';
import PlannerTypes from './types';

import PlannerRepository from '@modules/planner/infra/database/repositories/PlannerRepository';
import IPlannerRepository from '@modules/planner/repositories/IPlannerRepository';

const PlannerContainer = new Container();

PlannerContainer.bind<IPlannerRepository>(PlannerTypes.PlannerRepository).to(PlannerRepository);

export default PlannerContainer;
