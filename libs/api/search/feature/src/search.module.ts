import { SearchModule as SearchDataAccessModule } from '@mp/api/search/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SearchQueryHandler, GetProfileStatsQueryHandler } from './queries';
import { SearchService } from './search.service';
import { SearchEventHandler } from './events';
export const QueryHandlers = [ SearchQueryHandler, GetProfileStatsQueryHandler];
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