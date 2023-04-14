import { IGetContacts } from "../responses/get-contacts.response";

export class GetContactsCommand {
  constructor(public readonly request: IGetContacts) {}
}
