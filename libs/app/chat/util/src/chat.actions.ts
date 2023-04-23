import { ChatMessage } from "@mp/api/chat/util";

export class SubscribeToChat {
    static readonly type = '[Chat] SubscribeToChat';
  }
  
export class SetChatMessages {
    static readonly type = '[Chat] SetChatMessages';
    constructor(public readonly sender: string | "", public readonly reciever: string | "") { }
}
  
export class SetRecipient {
    static readonly type = '[Chat] SetRecipient';
    constructor(public readonly user: string | "") { }
}