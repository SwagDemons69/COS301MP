import { IContact } from "./contact.interface";

export interface IContacts{
    following: IContact [] | null | undefined;
    followers: IContact [] | null | undefined;
}