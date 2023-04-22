import {
ChatHeadersQuery,
ChatHeadersRequest,
ChatHeadersResponse,
CreateChatMessageCommand,
CreateChatMessageRequest,
CreateChatMessageResponse} from '@mp/api/chat/util';
  import { Injectable } from '@nestjs/common';
  import { CommandBus, QueryBus } from '@nestjs/cqrs';

  @Injectable()
  export class ChatService {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
    
    async getChatHeaders(request: ChatHeadersRequest): Promise<ChatHeadersResponse> {
        return await this.queryBus.execute<ChatHeadersQuery, ChatHeadersResponse>(new ChatHeadersQuery(request));
    }

    async SendChatMessage(request: CreateChatMessageRequest): Promise<CreateChatMessageResponse> {
        return await this.commandBus.execute<CreateChatMessageCommand, CreateChatMessageResponse>(new CreateChatMessageCommand(request));
    }
}
  