import { GetChatHistoryRequest } from '../requests';

export class GetChatHistoryCommand {
    constructor(public readonly request: GetChatHistoryRequest) {}
}