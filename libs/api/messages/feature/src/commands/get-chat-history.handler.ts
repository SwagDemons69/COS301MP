import { GetChatHistoryCommand } from '@mp/api/messages/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Messages } from '../models';

@CommandHandler(GetChatHistoryCommand)
export class GetChatHistoryHandler implements ICommandHandler<GetChatHistoryCommand>
{
    constructor(private publisher: EventPublisher) {}

    async execute(command: GetChatHistoryCommand) {
        console.log(`${GetChatHistoryHandler.name}`);
    
    }
}