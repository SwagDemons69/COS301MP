import { ChatMessage } from "@mp/api/chat/util";

export class SubscribeToChat {
    static readonly type = '[Chat] SubscribeToChat';
  }
  
export class SetChatMessages {
    static readonly type = '[Chat] SetChatMessages';
    constructor(public readonly profile: string | "", public readonly profile2: string | "") { }
}
  