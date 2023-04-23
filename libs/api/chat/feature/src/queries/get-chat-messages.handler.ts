import { ChatRepository } from '@mp/api/chat/data-access';
import { ChatHeadersQuery, ChatHeadersRequest, ChatHeadersResponse, GetChatMessagesQuery, GetChatMessagesResponse } from '@mp/api/chat/util';
import { CommandHandler, EventPublisher, ICommandHandler, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@QueryHandler(GetChatMessagesQuery)
export class GetChatMessagesQueryHandler
  implements
    IQueryHandler<GetChatMessagesQuery, GetChatMessagesResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ChatRepository
  ) {}

  async execute(command: GetChatMessagesQuery) {
    console.log(`${GetChatMessagesQueryHandler.name}`);
    const request = command.request;
    return await this.repository.getChatMessages(request.sender, request.reciever);
  }
}