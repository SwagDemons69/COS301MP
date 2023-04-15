import { ISendMessageRequest } from '../requests';

export class SendMessageCommand {
    constructor(public readonly request: ISendMessageRequest) {}
}