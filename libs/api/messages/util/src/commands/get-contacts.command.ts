import { GetContactsRequest } from '../requests';

export class GetContactsCommand {
    constructor(public readonly request: GetContactsRequest) {}
}