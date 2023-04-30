import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { GetBlipContentRequest, GetBlipContentResponse, GetGraveyardResponse, GetRecommendedPostsRequest, GetRecommendedPostsResponse, GetTrendingPostsRequest, GetTrendingPostsResponse } from '@mp/api/dashboard/util';
import { DashboardServices } from '@mp/api/dashboard/feature';
import * as admin from 'firebase-admin';
import { user_profile } from '@mp/api/profiles/util';
import { Timestamp } from 'firebase-admin/firestore';

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

export const GetGraveyard = functions.https.onCall(
    async (): Promise<GetGraveyardResponse> => {
        const handle = await admin.firestore().collection(`profiles`).get();
        const profiles = handle.docs.map((doc) => { return doc.data() as user_profile;});

        const deadProfiles = [];
        for(let i = 0;i < profiles.length; i++){
            console.log(profiles[i].timeOfExpiry + " " + Timestamp.now().seconds );
            if(profiles[i].timeOfExpiry < Timestamp.now().seconds ){
                deadProfiles.push(profiles[i]);
            }
        }
        return { profiles: deadProfiles};
    }
);

