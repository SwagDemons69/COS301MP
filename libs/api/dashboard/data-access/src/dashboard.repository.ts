import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { GetRecommendedPostsResponse, GetTrendingPostsResponse } from '@mp/api/dashboard/util';
import { post } from '@mp/api/home/util';
import { Timestamp } from '@google-cloud/firestore';

@Injectable()
export class DashboardRepository {
    async GetRecommendedPosts(users: string[] | null | undefined): Promise<GetRecommendedPostsResponse>{
        const posts: post[] = [];
        if(users == null || users == undefined || users.length == 0) {
            //Select 10 random posts if you aren't following anyone
            const users = await admin.firestore().collection('profiles').get();
            for (const user of users.docs) {
                const handle = await admin.firestore().collection(`profiles/${user.id}/posts`).get();
                posts.push(...handle.docs.map((doc) => { return doc.data() as post; }));
            }
            return { posts: posts.sort(() => { return Math.random() - 0.5; }).slice(0, 10) };
        } else {
            //Else return the 10 most recent posts from the people you follow
            for (const user of users){
                const handle = await admin.firestore().collection(`profiles/${user}/posts`).get();
                posts.push(...handle.docs.map((doc) => { return doc.data() as post; }));
            }
            return { posts: posts.sort((a, b) => ( b.timeStamp > a.timeStamp ? 1 : -1 )).slice(0, 10) }
        }
    }

    async GetTrendingPosts(numPosts: number): Promise<GetTrendingPostsResponse>{
        // Return the most liked posts based on the number of likes
        const users = await admin.firestore().collection('profiles').get();
        const posts: post[] = [];
        for (const user of users.docs) {
            const handle = await admin.firestore().collection(`profiles/${user.id}/posts`).get();
            for (const post of handle.docs.map((doc) => { return doc.data() as post; })){
                posts.push(post);
            }
        }
        return { posts: posts.sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1)).slice(0, numPosts) };
    }
}