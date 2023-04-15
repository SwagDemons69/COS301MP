import { MessagesRepository } from '@mp/api/messages/data-access';
import { MessageSentEvent } from '@mp/api/messages/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageSentEvent)
export class MessageSentHandler implements IEventHandler<MessageSentEvent>
{
    constructor(private readonly repository: MessagesRepository) {}

    async handle(event: MessageSentEvent) {
        console.log(`${MessageSentHandler.name}`);
        await this.repository.sendMessage(event.messages);
    }
}