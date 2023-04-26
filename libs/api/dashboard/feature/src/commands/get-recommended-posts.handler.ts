import { DashboardRepository } from '@mp/api/dashboard/data-access';
import { GetRecommendedPostsCommand, GetRecommendedPostsResponse } from '@mp/api/dashboard/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@CommandHandler(GetRecommendedPostsCommand)
export class GetRecommendedPostsCommandHandler
  implements
    ICommandHandler<GetRecommendedPostsCommand, GetRecommendedPostsResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: DashboardRepository
  ) {}

  async execute(command: GetRecommendedPostsCommand) {
    console.log(`${GetRecommendedPostsCommandHandler.name}`);
    const request = command.request;
    return await this.repository.GetRecommendedPosts(request.users);
  }
}