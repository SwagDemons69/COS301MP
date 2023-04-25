import { ChatModule as ChatDataAccessModule } from '@mp/api/chat/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateChatMessageCommandHandler } from './commands';
import { CreateChatMessageEventHandler} from './events';
import { ChatService } from './chat.service';
import { ChatHeadersQueryHandler, GetChatMessagesQueryHandler } from './queries';
export const CommandHandlers = [ CreateChatMessageCommandHandler ];
export const EventHandlers = [ CreateChatMessageEventHandler ];
export const QueryHandlers = [ ChatHeadersQueryHandler, GetChatMessagesQueryHandler ];

@Module({
  imports: [CqrsModule, ChatDataAccessModule],
  providers: [
    ChatService,
     ...CommandHandlers,
     ...EventHandlers,
     ...QueryHandlers
  ],
  exports: [ChatService],
})
export class ChatModule {}