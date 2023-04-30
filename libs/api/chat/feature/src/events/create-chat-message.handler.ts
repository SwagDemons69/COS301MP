import { ChatRepository } from '@mp/api/chat/data-access';
import { CreateChatMessageEvent } from '@mp/api/chat/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CreateChatMessageEvent)
export class CreateChatMessageEventHandler
  implements IEventHandler<CreateChatMessageEvent>
{
  constructor(private readonly repository: ChatRepository) {}

  async handle(event: CreateChatMessageEvent) {
    console.log(`${CreateChatMessageEventHandler.name}`);
    await this.repository.sendChatMessage(event.message.sender, event.message.receiver, event.message.timeStamp, event.message.payload);
  }
}
