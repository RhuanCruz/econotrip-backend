import { injectable } from 'inversify';
import { Body, Post, Route, Security, Tags } from 'tsoa';
import UserPushSubscriptionRepository from '@modules/user/infra/database/repositories/UserPushSubscriptionRepository';

interface SavePushSubscriptionDTO {
  userId: number;
  subscription: any;
}

@injectable()
@Route('users')
@Tags('User')
class SavePushSubscriptionService {
  private userPushSubscriptionRepository = new UserPushSubscriptionRepository();

  @Post('/push-subscription')
  @Security('BearerAuth')
  public async execute(@Body() { userId, subscription }: SavePushSubscriptionDTO): Promise<void> {
    await this.userPushSubscriptionRepository.createOrUpdate(userId, subscription);
  }
}

export default SavePushSubscriptionService;
