import { SearchModule as SearchDataAccessModule } from '@mp/api/search/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SearchQueryHandler } from './queries';
import { SearchService } from './search.service';
import { SearchEventHandler } from './events';
export const QueryHandlers = [ SearchQueryHandler];
export const EventHandlers = [ SearchEventHandler ];

@Module({
  imports: [CqrsModule, SearchDataAccessModule],
  providers: [
    SearchService,
     ...QueryHandlers,
     ...EventHandlers
  ],
  exports: [SearchService],
})
export class SearchModule {}