import { SearchRepository } from '@mp/api/search/data-access';
import { SearchEvent } from '@mp/api/search/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SearchEvent)
export class SearchEventHandler
  implements IEventHandler<SearchEvent>
{
  constructor(private readonly repository: SearchRepository) {}

  async handle(event: SearchEvent) {
    console.log(`${SearchEventHandler.name}`);
    await this.repository.search(event.search.query);
  }
}
