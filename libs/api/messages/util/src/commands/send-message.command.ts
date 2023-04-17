import { SendMessageRequest } from '../requests';

export class SendMessageCommand {
    constructor(public readonly request: SendMessageRequest) {}
}