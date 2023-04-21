import { AggregateRoot } from '@nestjs/cqrs';
import { ChatMessage, CreateChatMessageEvent } from '@mp/api/chat/util';

export class Chat extends AggregateRoot implements ChatMessage {
  constructor(
    public sender: string,
    public receiver: string,
    public timeStamp: string,
    public payload: string
  ) {
    super();
  }

  static fromData(chat: ChatMessage): Chat {
    const instance = new Chat(
      chat.sender,
      chat.receiver,
      chat.timeStamp,
      chat.payload
    );
    return instance;
  }

  static createChatBlueprint(): Chat{
    const instance = new Chat(
        "",
        "",
        "",
        ""
    )
    return instance;
  }

  sendChat(){
    this.apply(new CreateChatMessageEvent(this.toJSON()));
  }

  manageChatMessage(chat : ChatMessage) {
    this.sender       =  (this.sender == chat.sender)                   ?   this.sender        :  chat.sender;
    this.receiver     =  (this.receiver == chat.receiver)               ?   this.receiver      :  chat.receiver;
    this.timeStamp    =  (this.timeStamp == chat.timeStamp)             ?   this.timeStamp     :  chat.timeStamp;
    this.payload      =  (this.payload == chat.payload)                 ?   this.payload       :  chat.payload;
}

  toJSON(): ChatMessage {
    return {
        sender      : this.sender,
        receiver    : this.receiver,
        timeStamp   : this.timeStamp,
        payload     : this.payload
    };
  }
}