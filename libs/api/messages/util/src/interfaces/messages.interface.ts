import { IChats } from "./chats.interface";
import { IContacts } from "./contacts.interface";

export interface IMessages {
    //contacts
    userId: string;
    contacts?: IContacts | null | undefined;
    //chathistory
    chatsHistory?: IChats | null | undefined;
}