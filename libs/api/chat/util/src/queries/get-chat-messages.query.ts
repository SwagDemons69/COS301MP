import { GetChatMessagesRequest } from '../requests';

export class GetChatMessagesQuery {
  constructor(public readonly request: GetChatMessagesRequest) {}
}
