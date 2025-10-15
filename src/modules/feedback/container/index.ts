import { Container } from 'inversify';
import FeedbackTypes from './types';

import FeedbackRepository from '@modules/feedback/infra/database/repositories/FeedbackRepository';
import IFeedbackRepository from '@modules/feedback/repositories/IFeedbackRepository';

const FeedbackContainer = new Container();

FeedbackContainer.bind<IFeedbackRepository>(FeedbackTypes.FeedbackRepository).to(FeedbackRepository);

export default FeedbackContainer;
