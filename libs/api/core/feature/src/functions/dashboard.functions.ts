import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { GetBlipContentRequest, GetBlipContentResponse, GetRecommendedPostsRequest, GetRecommendedPostsResponse, GetTrendingPostsRequest, GetTrendingPostsResponse } from '@mp/api/dashboard/util';
import { DashboardServices } from '@mp/api/dashboard/feature';

export const GetRecommendedPosts = functions.https.onCall(
    async (request : GetRecommendedPostsRequest): Promise<GetRecommendedPostsResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(DashboardServices);
        return service.GetRecommendedPosts(request);
    }
);

export const GetTrendingPosts = functions.https.onCall(
    async (request : GetTrendingPostsRequest): Promise<GetTrendingPostsResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(DashboardServices);
        return service.GetTrendingPosts(request);
    }
);

export const GetBlipContent = functions.https.onCall(
    async (request : GetBlipContentRequest): Promise<GetBlipContentResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(DashboardServices);
        return service.GetBlipContent(request);
    }
);

