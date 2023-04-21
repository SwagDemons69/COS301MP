import {ChatHeadersCommand,
ChatHeadersRequest,
ChatHeadersResponse,
CreateChatMessageCommand,
CreateChatMessageRequest,
CreateChatMessageResponse} from '@mp/api/chat/util';
  import { Injectable } from '@nestjs/common';
  import { CommandBus } from '@nestjs/cqrs';

  @Injectable()
  export class ChatService {
    constructor(private readonly commandBus: CommandBus) {}
    
    async getChatHeaders(request: ChatHeadersRequest): Promise<ChatHeadersResponse> {
        return await this.commandBus.execute<ChatHeadersCommand, ChatHeadersResponse>(new ChatHeadersCommand(request));
    }

    async SendChatMessage(request: CreateChatMessageRequest): Promise<CreateChatMessageResponse> {
        return await this.commandBus.execute<CreateChatMessageCommand, CreateChatMessageResponse>(new CreateChatMessageCommand(request));
    }
}
  