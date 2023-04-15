import { IGetChatHistoryRequest } from '../requests';

export class GetChatHistoryCommand {
    constructor(public readonly request: IGetChatHistoryRequest) {}
}