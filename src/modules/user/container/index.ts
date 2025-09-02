import { Container } from 'inversify';
import UserTypes from './types';

import UserRepository from '@modules/user/infra/database/repositories/UserRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';

import UserActionRepository from '@modules/user/infra/database/repositories/UserActionRepository';
import IUserActionRepository from '@modules/user/repositories/IUserActionRepository';

import UserActionLogRepository from '@modules/user/infra/database/repositories/UserActionLogRepository';
import IUserActionLogRepository from '@modules/user/repositories/IUserActionLogRepository';
import UserPushSubscriptionRepository from '@modules/user/infra/database/repositories/UserPushSubscriptionRepository';

const UserContainer = new Container();

UserContainer.bind<IUserRepository>(UserTypes.UserRepository).to(UserRepository);
UserContainer.bind<IUserActionRepository>(UserTypes.UserActionRepository).to(UserActionRepository);
UserContainer.bind<IUserActionLogRepository>(UserTypes.UserActionLogRepository).to(UserActionLogRepository);
UserContainer.bind<UserPushSubscriptionRepository>(UserTypes.UserPushSubscriptionRepository).to(UserPushSubscriptionRepository);

export default UserContainer;
