import { DashboardRepository } from '@mp/api/dashboard/data-access';
import { GetTrendingPostsCommand, GetTrendingPostsResponse } from '@mp/api/dashboard/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@CommandHandler(GetTrendingPostsCommand)
export class GetTrendingPostsCommandHandler
  implements
    ICommandHandler<GetTrendingPostsCommand, GetTrendingPostsResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: DashboardRepository
  ) {}

  async execute(command: GetTrendingPostsCommand) {
    console.log('GetTrendingPostsCommandHandler');
    console.log(`${GetTrendingPostsCommandHandler.name}`);
    const request = command.request;
    return await this.repository.GetTrendingPosts(request.numPosts);
  }
}