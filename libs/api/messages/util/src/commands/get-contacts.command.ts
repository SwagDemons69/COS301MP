import { IGetContactsRequest } from '../requests';

export class GetContactsCommand {
    constructor(public readonly request: IGetContactsRequest) {}
}