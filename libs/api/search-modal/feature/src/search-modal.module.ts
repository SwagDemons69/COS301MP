import { SearchModalModule as SearchModalDataAccessModule } from '@mp/api/search-modal/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
//import { CreateChatMessageCommandHandler } from './commands';
//import { CreateChatMessageEventHandler} from './events';
import { RetrieveProfilesQueryHandler } from './queries';
import { SearchModalService } from './search-modal.service';
//import { ChatHeadersQueryHandler } from './queries';
//export const CommandHandlers = [ CreateChatMessageCommandHandler ];
//export const EventHandlers = [ CreateChatMessageEventHandler ];
export const QueryHandlers = [ RetrieveProfilesQueryHandler ];

@Module({
  imports: [CqrsModule, SearchModalDataAccessModule],
  providers: [
    SearchModalService,
    //  ...CommandHandlers,
    //  ...EventHandlers,
      ...QueryHandlers
  ],
  exports: [SearchModalService],
})
export class SearchModalModule {}