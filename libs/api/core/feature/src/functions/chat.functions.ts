import { ChatService } from '@mp/api/chat/feature';
import { ChatHeadersRequest, ChatHeadersResponse, CreateChatMessageRequest, CreateChatMessageResponse } from '@mp/api/chat/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const ChatHeaders = functions.https.onCall(
  async (request: ChatHeadersRequest): Promise<ChatHeadersResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ChatService);
    return service.getChatHeaders(request);
  }
);

export const SendChatMessage = functions.https.onCall(
  async (request: CreateChatMessageRequest): Promise<CreateChatMessageResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ChatService);
    return service.SendChatMessage(request);
  }
);

