import { ChatMessage } from '../interfaces';

export class CreateChatMessageEvent {
  constructor(public readonly message: ChatMessage) {}
}