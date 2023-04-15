import {
    SendMessageCommand,
    IMessages
} from '@mp/api/messages/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Messages } from '../models';

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand>
{
    constructor(private publisher: EventPublisher) {}

    async execute(command: SendMessageCommand) {
        console.log(`${SendMessageHandler.name}`);

        //todo
    }
}