
import { GetChatMessagesQuery } from '@mp/api/chat/util';
import { DashboardRepository } from '@mp/api/dashboard/data-access';
import { GetBlipContentQuery, GetBlipContentResponse } from '@mp/api/dashboard/util';
import { EventPublisher, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@QueryHandler(GetBlipContentQuery)
export class GetBlipContentQueryHandler
  implements
    IQueryHandler<GetBlipContentQuery, GetBlipContentResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: DashboardRepository
  ) {}

  async execute(query: GetBlipContentQuery) {
    console.log(`${GetBlipContentQueryHandler.name}`);
    const request = query.request;
    return await this.repository.GetBlipContent(request);

  }
}