import { ChatRepository } from '@mp/api/chat/data-access';
import { ChatHeadersQuery, ChatHeadersRequest, ChatHeadersResponse } from '@mp/api/chat/util';
import { CommandHandler, EventPublisher, ICommandHandler, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@QueryHandler(ChatHeadersQuery)
export class ChatHeadersQueryHandler
  implements
    IQueryHandler<ChatHeadersQuery, ChatHeadersResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ChatRepository
  ) {}

  async execute(command: ChatHeadersQuery) {
    console.log(`${ChatHeadersQueryHandler.name}`);
    const request = command.request;
    console.log("Chat Query Handler")
    return  {chats: []};
  }
}