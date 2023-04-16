import { MessagesRepository } from "@mp/api/messages/data-access";
import { GetContactsEvent } from "@mp/api/messages/util";
import { EventsHandler, IEventHandler} from "@nestjs/cqrs";

@EventsHandler(GetContactsEvent)
export class GetContactsHandler implements IEventHandler<GetContactsEvent>
{
    constructor(private readonly repository: MessagesRepository ) {}

    async handle(event: GetContactsEvent){
        console.log(`${GetContactsHandler.name}`);
        await this.repository.getContacts(event.contacts.user_id);
    }
}
