import { ChatModule as ChatDataAccessModule } from '@mp/api/chat/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ChatHeadersCommandHandler, CreateChatMessageCommandHandler } from './commands';
import { CreateChatMessageEventHandler} from './events';
import { ChatService } from './chat.service';
export const CommandHandlers = [ ChatHeadersCommandHandler, CreateChatMessageCommandHandler ];
export const EventHandlers = [ CreateChatMessageEventHandler ];

@Module({
  imports: [CqrsModule, ChatDataAccessModule],
  providers: [
    ChatService,
     ...CommandHandlers,
     ...EventHandlers
  ],
  exports: [ChatService],
})
export class ChatModule {}