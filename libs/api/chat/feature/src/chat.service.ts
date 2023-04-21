import {ChatHeadersCommand,
ChatHeadersRequest,
ChatHeadersResponse} from '@mp/api/chat/util';
  import { Injectable } from '@nestjs/common';
  import { CommandBus } from '@nestjs/cqrs';

  @Injectable()
  export class ChatService {
    constructor(private readonly commandBus: CommandBus) {}
    
    async getChatHeaders(request: ChatHeadersRequest): Promise<ChatHeadersResponse> {
        return await this.commandBus.execute<ChatHeadersCommand, ChatHeadersResponse>(new ChatHeadersCommand(request));
    }
}
  