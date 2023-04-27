import { GetBlipContentRequest, GetBlipContentResponse, GetRecommendedPostsResponse, GetTrendingPostsResponse } from '@mp/api/dashboard/util';
import { post } from '@mp/api/home/util';
import { ChildComment, post_like, RootComment } from '@mp/api/post/util';
import { user_profile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { PostHeader, postData, userData } from '@mp/api/dashboard/util';

@Injectable()
export class DashboardRepository {
    async GetRecommendedPosts(users: string[] | null | undefined): Promise<GetRecommendedPostsResponse> {
        const posts: PostHeader[] = [];
        if (users == null || users == undefined || users.length == 0) {
            //Select 10 random posts if you aren't following anyone
            const users = await admin.firestore().collection('profiles').get();
            for (const user of users.docs) {
                const handle = await admin.firestore().collection(`profiles/${user.id}/posts`).get();
                const postTemp = []; postTemp.push(...handle.docs.map((doc) => { return doc.data() as post; }));
                
                for(let i = 0; i < postTemp.length; i++){
                    const profilesRef = admin.firestore().collection(`profiles`).doc(postTemp[i].user_id);
                    const profile = await profilesRef.get();
                    const profileData = profile.data() as user_profile; 

                    const postH: PostHeader = {
                        user : {
                            user_id: postTemp[i].user_id,
                            username: profileData.username,
                            image: profileData.profilePicturePath
                        },
                        post : {
                            title: postTemp[i].title,
                            content: postTemp[i].content,
                            desc: postTemp[i].desc,
                            likes: postTemp[i].likes,
                            comments: postTemp[i].comments,
                            shares: postTemp[i].shares

                        },
                        timeStamp: postTemp[i].timeStamp,
                        postData: postTemp[i]
                    }
                    posts.push(postH);
                }

            }
            return { posts: posts.sort(() => { return Math.random() - 0.5; }).slice(0, 10) };
        } else {
            //Else return the 10 most recent posts from the people you follow
            for (const user of users) {
                const handle = await admin.firestore().collection(`profiles/${user}/posts`).get();
                const postTemp = []; postTemp.push(...handle.docs.map((doc) => { return doc.data() as post; }));
                
                for(let i = 0; i < postTemp.length; i++){
                    const profilesRef = admin.firestore().collection(`profiles`).doc(postTemp[i].user_id);
                    const profile = await profilesRef.get();
                    const profileData = profile.data() as user_profile; 

                    const postH: PostHeader = {
                        user : {
                            user_id: postTemp[i].user_id,
                            username: profileData.username,
                            image: profileData.profilePicturePath
                        },
                        post : {
                            title: postTemp[i].title,
                            content: postTemp[i].content,
                            desc: postTemp[i].desc,
                            likes: postTemp[i].likes,
                            comments: postTemp[i].comments,
                            shares: postTemp[i].shares

                        },
                        timeStamp: postTemp[i].timeStamp,
                        postData: postTemp[i]
                    }
                    posts.push(postH);
                }
            }
            return { posts: posts.sort((a, b) => (b.timeStamp > a.timeStamp ? 1 : -1)).slice(0, 10) }
        }
    }

    async GetTrendingPosts(latest: number): Promise<GetTrendingPostsResponse> {
        // Return the 10 most liked posts in the last "latest" time span
        const users = await admin.firestore().collection('profiles').get();
        const posts: PostHeader[] = [];
        for (const user of users.docs) {
            const handle = await admin.firestore().collection(`profiles/${user.id}/posts`).get();
            for (const post of handle.docs.map((doc) => { return doc.data() as post; })) {
                if (post.timeStamp > latest) {

                    const profilesRef = admin.firestore().collection(`profiles`).doc(post.user_id);
                    const profile = await profilesRef.get();
                    const profileData = profile.data() as user_profile; 

                    const postH: PostHeader = {
                        user : {
                            user_id: post.user_id,
                            username: profileData.username,
                            image: profileData.profilePicturePath
                        },
                        post : {
                            title: post.title,
                            content: post.content,
                            desc: post.desc,
                            likes: post.likes,
                            comments: post.comments,
                            shares: post.shares

                        },
                        timeStamp: post.timeStamp,
                        postData: post
                    }
                    posts.push(postH);
                }
            }
        }
        return { posts: posts.sort((a, b) => (a.post.likes < b.post.likes ? 1 : -1)).slice(0, 20) };
    }

    async GetBlipContent(request: GetBlipContentRequest) {
        const user = request.user;
        const post = request.post;
        const profilesRef = admin.firestore().collection(`profiles`).doc(user);
        const profile = await profilesRef.get();
        const profileData = profile.data() as user_profile;

        const username = (profileData.username) ? profileData.username : profileData.email;

        const likesRef = await admin.firestore().collection(`profiles/${user}/posts/${post}/likes`).get();
        const likes = likesRef.docs.map((doc) => { return doc.data() as post_like });

        const commentsRef = await admin.firestore().collection(`profiles/${user}/posts/${post}/root-comments`).get();
        const RootComments = commentsRef.docs.map((doc) => { return doc.data() as RootComment; });

        for (let i = 0; i < RootComments.length; i++) {
            const commentsRef = await admin.firestore().collection(`profiles/${user}/posts/${post}/root-comments/${RootComments[i].root_comment_id}/child-comments`).get();
            const ChildComments = commentsRef.docs.map((doc) => { return doc.data() as ChildComment; });
            RootComments[i].comments = ChildComments;
        }

        return{ username: username, imageURL: profileData.profilePicturePath, likes: likes, comments: RootComments };
    }
}