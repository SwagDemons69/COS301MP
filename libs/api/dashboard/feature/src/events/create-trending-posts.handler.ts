import { DashboardRepository } from '@mp/api/dashboard/data-access';
import { CreateTrendingPostEvent } from '@mp/api/dashboard/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CreateTrendingPostEvent)
export class CreateTrendingPostEventHandler
  implements IEventHandler<CreateTrendingPostEvent>
{
  constructor(private readonly repository: DashboardRepository) {}

  async handle(event: CreateTrendingPostEvent) {
    console.log(`${CreateTrendingPostEventHandler.name}`);
    await this.repository.GetTrendingPosts(event.cutoff);
  }
}
