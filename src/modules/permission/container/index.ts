import { Container } from 'inversify';

import PermissionTypes from './types';
import PermissionRepository from '@modules/permission/infra/database/repositories/PermissionRepository';
import RoleRepository from '@src/modules/permission/infra/database/repositories/RoleRepository';

import IPermissionRepository from '@modules/permission/repositories/IPermissionRepository';
import IRoleRepository from '@modules/permission/repositories/IRoleRepository';

const PermissionContainer = new Container();

PermissionContainer.bind<IPermissionRepository>(PermissionTypes.PermissionRepository).to(PermissionRepository);
PermissionContainer.bind<IRoleRepository>(PermissionTypes.RoleRepository).to(RoleRepository);

export default PermissionContainer;
