import { CreateChatMessageRequest } from '../requests';

export class CreateChatMessageCommand {
  constructor(public readonly request: CreateChatMessageRequest) {}
}