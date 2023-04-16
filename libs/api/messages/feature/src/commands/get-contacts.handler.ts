import { GetContactsCommand, IContacts } from '@mp/api/messages/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Messages } from '../models';
@CommandHandler(GetContactsCommand)
export class GetContactsHandler implements ICommandHandler<GetContactsCommand>
{
    constructor(private publisher: EventPublisher) {}

    async execute(command: GetContactsCommand) {
        console.log(`${GetContactsHandler.name}`);
        const request = command.request;
        const user_id =  request.contacts.user_id;
        const following = request.contacts.following;
        const followers = request.contacts.followers;
        const data: IContacts = {
            user_id: user_id,
            following: following,
            followers: followers,
        }

        //const contactModel = this.publisher.mergeObjectContext(Messages.fromData(data));
        //TO-DO
    }
}