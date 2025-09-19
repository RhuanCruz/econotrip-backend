import { Container } from 'inversify';

import NotificationTypes from './types';
import NotificationRepository from '@modules/notification/infra/database/repositories/NotificationRepository';
import INotificationRepository from '@repositories/INotificationRepository';

const NotificationContainer = new Container();

NotificationContainer.bind<INotificationRepository>(NotificationTypes.NotificationRepository).to(NotificationRepository);

export default NotificationContainer;
