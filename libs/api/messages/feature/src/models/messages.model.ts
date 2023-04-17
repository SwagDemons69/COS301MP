import { chats,  contacts, user_messages } from "@mp/api/messages/util";
import { user_profile } from "@mp/api/profiles/util";
import { AggregateRoot } from "@nestjs/cqrs";

export class Messages extends AggregateRoot implements user_messages {
 constructor(
    public contacts: contacts,
    public user_profile: user_profile
 ){
    super();
 }
 static fromData(contacts: contacts, chats: chats){
    return null;
 }
 
}   