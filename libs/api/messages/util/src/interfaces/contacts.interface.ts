import { IContact } from "./contact.interface";

export interface IContacts{
    contactsFollowing: IContact [] | null | undefined;
    contactsFollowers: IContact [] | null | undefined;
}