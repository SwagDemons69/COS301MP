import { GetContactsCommand } from '@mp/api/messages/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
@CommandHandler(GetContactsCommand)
export class GetContactsHandler implements ICommandHandler<GetContactsCommand>
{
    constructor(private publisher: EventPublisher) {}

    async execute(command: GetContactsCommand) {
        console.log(`${GetContactsHandler.name}`);
        const request = command.request;
        const user_id =  command.request.contacts.user_id;
        //const following = 
        //TO-DO
    }
}