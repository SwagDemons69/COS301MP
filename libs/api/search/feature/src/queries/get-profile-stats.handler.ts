import { SearchRepository } from '@mp/api/search/data-access';
import { GetProfileStatsQuery, SearchQuery, SearchResponse, GetProfileStatsResponse} from '@mp/api/search/util';
import { QueryHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@QueryHandler(GetProfileStatsQuery)
export class GetProfileStatsQueryHandler
  implements
    ICommandHandler<GetProfileStatsQuery, GetProfileStatsResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SearchRepository
  ) {}

  async execute(query: GetProfileStatsQuery): Promise<GetProfileStatsResponse> {
    console.log(`${GetProfileStatsQueryHandler.name}`);
 
    const request = query.request;
    const response  = await this.repository.getProfileStats(request.user);
    return response;
  }
}