import { ChatService } from '@mp/api/chat/feature';

import { SearchModalService } from '@mp/api/search-modal/feature';

import { ChatHeadersRequest, ChatHeadersResponse, CreateChatMessageRequest, CreateChatMessageResponse } from '@mp/api/chat/util';
import { RetrieveProfilesRequest, RetrieveProfilesResponse } from '@mp/api/search-modal/util';
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

export const RetrieveProfiles = functions.https.onCall(
  async (request: RetrieveProfilesRequest): Promise<RetrieveProfilesResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SearchModalService);
    return service.retrieveProfiles(request);
  }
);


