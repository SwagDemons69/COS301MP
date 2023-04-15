import {
    GetContactsCommand,
    IMessages,
} from '@mp/api/messages/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Messages } from '../models';

@CommandHandler(GetContactsCommand)
export class GetContactsHandler implements ICommandHandler<GetContactsCommand>
{
    constructor(private publisher: EventPublisher) {}

    async execute(command: GetContactsCommand) {
        console.log(`${GetContactsHandler.name}`);

        //todo
    }
}