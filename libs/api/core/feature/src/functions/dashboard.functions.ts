import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { GetRecommendedPostsRequest, GetRecommendedPostsResponse, GetTrendingPostsRequest, GetTrendingPostsResponse } from '@mp/api/dashboard/util';
import { DashboardServices } from '@mp/api/dashboard/feature';

export const GetRecommendedPosts = functions.https.onCall(
    async (request : GetRecommendedPostsRequest): Promise<GetRecommendedPostsResponse> => {
        console.log("GetRecommendedPostsFunction");
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(DashboardServices);
        console.log(request);
        return service.GetRecommendedPosts(request);
    }
);

export const GetTrendingPosts = functions.https.onCall(
    async (request : GetTrendingPostsRequest): Promise<GetTrendingPostsResponse> => {
        console.log("GetTrendingPostsFunction");
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(DashboardServices);
        console.log(request)
        return service.GetTrendingPosts(request);
    }
);