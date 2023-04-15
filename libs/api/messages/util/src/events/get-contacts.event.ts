import { IContacts } from "../interfaces";

export class GetContactsEvent{
	constructor(public readonly contacts: IContacts){}
}