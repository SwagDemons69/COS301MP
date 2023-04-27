import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { AddPhotoResponse, ChildComment, CreatePostChildCommentResponse, CreatePostLikeResponse, CreatePostResponse, CreatePostRootCommentResponse, GetPostsResponse, RootComment } from '@mp/api/post/util';
import { post } from '@mp/api/home/util';
import { post_like } from '@mp/api/post/util';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { user } from 'firebase-functions/v1/auth';

@Injectable()
export class PostRepository {

    async AddPhoto(file: string, fileName : string): Promise<AddPhotoResponse> {
        const storage = getStorage(initializeApp({projectId: 'twenty4-f9f8e',  storageBucket : 'twenty4-f9f8e.appspot.com'}));
        const bucket = admin.storage().bucket();
        connectStorageEmulator(storage, "localhost", 5006);
        const photosRef = ref(storage,`photos/${fileName}`);
        const snapshot = await uploadString(photosRef, file, 'base64');
        const file2 = await bucket.file(snapshot.metadata.fullPath).makePublic();
        const url = bucket.file(snapshot.metadata.fullPath).publicUrl();
        return { pathToImage: url };
    }
    
    async createPost(post: post){
        const postRef = admin.firestore()
        .collection(`profiles/${post.user_id}/posts`).doc();
        post.post_id = postRef.id;
        postRef.set(post);
    }
    
    async createPostLike(liker_id: string, post_id: string, poster_id: string): Promise<CreatePostLikeResponse>{
        console.log("Liking post");
        const handle = await admin.firestore().collection(`profiles/${poster_id}/posts/${post_id}/likes`).get();
        const likes = handle.docs.map((doc) => { return doc.data() as post_like;});
        let flag = false;
        for(let i = 0;i < likes.length; i++){
            if(likes[i].user == poster_id)
                flag = true;
        }
        
        if(!flag){
            const newLike = admin.firestore().collection(`profiles/${poster_id}/posts/${post_id}/likes`).doc();
            await newLike.set({user: poster_id});
        }
        const likesRef = await admin.firestore().collection(`profiles/${poster_id}/posts/${post_id}/likes`).get();
        const allLikes = likesRef.docs.map((doc) => { return doc.data() as post_like;});
        return {likes : allLikes};
    }
    
    async createPostRootComment(user: string, post: string, comment: RootComment): Promise<CreatePostRootCommentResponse>{
        const handle = admin.firestore().collection(`profiles/${user}/posts/${post}/root-comments`).doc();
        comment.root_comment_id = handle.id;
        await handle.set(comment);
        
        //Get all comments and their child comments    
        const commentsRef = await admin.firestore().collection(`profiles/${user}/posts/${post}/root-comments`).get(); 
        const RootComments = commentsRef.docs.map((doc) => { return doc.data() as RootComment;});

        for(let i = 0; i < RootComments.length; i++){
            const commentsRef = await admin.firestore().collection(`profiles/${user}/posts/${post}/root-comments/${RootComments[i].root_comment_id}/child-comments`).get();
            const ChildComments = commentsRef.docs.map((doc) => { return doc.data() as ChildComment;});
            RootComments[i].comments = ChildComments;
        }
        return { post_comments: RootComments };
    }

    async createPostChildComment(user: string, post: string, rootComment: string, comment: ChildComment): Promise<CreatePostChildCommentResponse> {
        const handle = admin.firestore().collection(`profiles/${user}/posts/${post}/root-comments/${rootComment}/child-comments`).doc();
        comment.child_comment_id = handle.id;
        await handle.set(comment);    
         //Get all comments and their child comments    
         const commentsRef = await admin.firestore().collection(`profiles/${user}/posts/${post}/root-comments`).get(); 
         const RootComments = commentsRef.docs.map((doc) => { return doc.data() as RootComment;});
 
         for(let i = 0; i < RootComments.length; i++){
             const commentsRef = await admin.firestore().collection(`profiles/${user}/posts/${post}/root-comments/${RootComments[i].root_comment_id}/child-comments`).get();
             const ChildComments = commentsRef.docs.map((doc) => { return doc.data() as ChildComment;});
             RootComments[i].comments = ChildComments;
         }
         return { post_comments: RootComments };
    }

    async getPosts(user: string): Promise<GetPostsResponse>{
        const handle = await admin.firestore().collection(`profiles/${user}/posts`).get();
        const posts = handle.docs.map((doc) => { return doc.data() as post; });
        console.log(posts)
        return { posts: posts};
    }
}