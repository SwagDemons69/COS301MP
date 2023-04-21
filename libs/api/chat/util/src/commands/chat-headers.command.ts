import { ChatHeadersRequest } from '../requests';

export class ChatHeadersCommand {
  constructor(public readonly request: ChatHeadersRequest) {}
}