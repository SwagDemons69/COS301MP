import { IChats, IContacts, IMessages } from "@mp/api/messages/util";
import { AggregateRoot } from "@nestjs/cqrs";

export class Messages extends AggregateRoot implements IMessages {
 constructor(
    public contacts: IContacts,
    public chats : IChats
 ){
    super();
 }
 
}