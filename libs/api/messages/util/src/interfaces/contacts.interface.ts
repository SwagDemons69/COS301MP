import { IContact } from "./contact.interface";

export interface IContacts{
    following: IContact [] | null | undefined;
    follwoers: IContact [] | null | undefined;
}