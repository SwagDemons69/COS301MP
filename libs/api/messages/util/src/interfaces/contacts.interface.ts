import { IContact } from "./contact.interface";

export interface IContacts{
    user_id: string;
    following: IContact [] | null | undefined;
    followers: IContact [] | null | undefined;
}