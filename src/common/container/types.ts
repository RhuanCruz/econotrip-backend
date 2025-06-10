import PermissionTypes from '@modules/permission/container/types';
import LocationTypes from '@modules/location/container/types';
import ProviderTypes from '@common/providers/container/types';
import FlightTypes from '@modules/flights/container/types';
import UserTypes from '@modules/user/container/types';
import RadarTypes from '@modules/radar/container/types';
import PlannerTypes from '@modules/planner/container/types';

const Types = {
  ...PermissionTypes,
  ...ProviderTypes,
  ...LocationTypes,
  ...FlightTypes,
  ...UserTypes,
  ...RadarTypes,
  ...PlannerTypes,
};

export default Types;
