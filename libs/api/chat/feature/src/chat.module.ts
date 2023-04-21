import { ChatModule as ChatDataAccessModule } from '@mp/api/chat/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';


import { ChatHeadersCommandHandler } from './commands';

import { ChatService } from './chat.service';
//import { CreatePostEventHandler } from './events';
//import { CreatePostLikeCommandHandler } from './commands/create-post-like.handler';
export const CommandHandlers = [ ChatHeadersCommandHandler ];
//export const EventHandlers = [ CreatePostEventHandler ];

@Module({
  imports: [CqrsModule, ChatDataAccessModule],
  providers: [
    ChatService,
     ...CommandHandlers,
     //...EventHandlers
  ],
  exports: [ChatService],
})
export class ChatModule {}