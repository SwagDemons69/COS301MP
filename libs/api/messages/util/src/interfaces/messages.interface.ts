import { IChats } from "./chats.interface";
import { IContacts } from "./contacts.interface";

export interface IMessages {
    contacts?: IContacts;
    //chathistory
    chatsHistory?: IChats;
}