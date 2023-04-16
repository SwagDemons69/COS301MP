import { MessagesRepository } from '@mp/api/messages/data-access';
import { SendMessageEvent } from '@mp/api/messages/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SendMessageEvent)
export class MessageSentHandler implements IEventHandler<SendMessageEvent>
{
    constructor(private readonly repository: MessagesRepository) {}

    async handle(event: SendMessageEvent) {
        console.log(`${MessageSentHandler.name}`);
       // await this.repository.sendMessage();
    }
}