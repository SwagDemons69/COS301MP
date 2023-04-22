import { ChatHeader } from "@mp/api/chat/util";

//Example
export class SetHeaders {
    static readonly type = '[Messages] SetHeaders';
    constructor(public readonly headers: ChatHeader[] | []) { }
  }

  export class SubscribeToMessageHeaders {
    static readonly type = '[Messages] SubscribeToMessageHeaders';
    //constructor(public readonly profile: user_profile | null) { }
  }