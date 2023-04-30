import { DashboardRepository } from '@mp/api/dashboard/data-access';
import { CreateRecommendedPostEvent } from '@mp/api/dashboard/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CreateRecommendedPostEvent)
export class CreateRecommendedPostEventHandler
  implements IEventHandler<CreateRecommendedPostEvent>
{
  constructor(private readonly repository: DashboardRepository) {}

  async handle(event: CreateRecommendedPostEvent) {
    console.log(`${CreateRecommendedPostEventHandler.name}`);
    await this.repository.GetRecommendedPosts(event.users);
  }
}