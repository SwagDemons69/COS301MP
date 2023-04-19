import { contacts } from "../interfaces";

export class GetContactsEvent{
	constructor(public readonly contacts: contacts){}
}