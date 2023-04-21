import { ChatRepository } from '@mp/api/chat/data-access';
import { ChatHeadersCommand, ChatHeadersRequest, ChatHeadersResponse } from '@mp/api/chat/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@CommandHandler(ChatHeadersCommand)
export class ChatHeadersCommandHandler
  implements
    ICommandHandler<ChatHeadersCommand, ChatHeadersResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ChatRepository
  ) {}

  async execute(command: ChatHeadersCommand) {
    console.log(`${ChatHeadersCommandHandler.name}`);
    const request = command.request;
    console.log("Chat Handler")
    return  {chats: []};
  }
}