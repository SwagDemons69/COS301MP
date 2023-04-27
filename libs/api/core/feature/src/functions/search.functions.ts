//general search for posts/people
import {SearchService} from '@mp/api/search/feature';
import { SearchRequest, SearchResponse, GetProfileStatsResponse, GetProfileStatsRequest} from '@mp/api/search/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const search: any = functions.https.onCall(
  async ( request: SearchRequest): Promise<SearchResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SearchService);
    return service.search(request);
  }
);

export const getProfileStats: any = functions.https.onCall(
  async ( request: GetProfileStatsRequest): Promise<GetProfileStatsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SearchService);
    return service.getProfileStats(request);
  }
);