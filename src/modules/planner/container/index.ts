import { Container } from 'inversify';
import PlannerTypes from './types';

import PlannerRepository from '@modules/planner/infra/database/repositories/PlannerRepository';
import IPlannerRepository from '@modules/planner/repositories/IPlannerRepository';
import { GeneratePlannerService } from '@modules/planner/useCases/GeneratePlanner/GeneratePlannerService';

const PlannerContainer = new Container();

PlannerContainer.bind<IPlannerRepository>(PlannerTypes.PlannerRepository).to(PlannerRepository);
PlannerContainer.bind<GeneratePlannerService>(PlannerTypes.GeneratePlannerService).to(GeneratePlannerService);

export default PlannerContainer;
