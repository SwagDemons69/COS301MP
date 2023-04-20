import { SearchRepository } from '@mp/api/search/data-access';
import { SearchQuery, SearchResponse} from '@mp/api/search/util';
import { QueryHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@QueryHandler(SearchQuery)
export class SearchQueryHandler
  implements
    ICommandHandler<SearchQuery, SearchResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SearchRepository
  ) {}

  async execute(query: SearchQuery) {
    console.log(`${SearchQueryHandler.name}`);
 
    const request = query.request;
    return  await this.repository.search(request.query);
  }
}