import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { AddPhotoResponse, ChildComment, CreatePostChildCommentResponse, CreatePostLikeResponse, CreatePostResponse, CreatePostRootCommentResponse, GetPostsResponse, RootComment } from '@mp/api/post/util';
import { post } from '@mp/api/home/util';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';

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
    
    async createPostLike(user_id: string, post_id: string): Promise<CreatePostLikeResponse>{

        const postId = Number(post_id);
        const docRef = admin.firestore().collection('profiles').doc(user_id);
        
        await admin.firestore().runTransaction(transaction =>{
            return transaction.get(docRef).then(doc =>{
                if(!doc.data()?.['posts'][0]['likes']){
                    console.log("ERROR, CANT FIND LIKES")
                }
                else{
                    let found = false;
                    const posts = doc.data()?.['posts'];
                    const likes = doc.data()?.['posts'][postId]['likes'];
                    for(const like of likes){
                        if(like == user_id){
                            found = true;
                        }
                    }
                    //Validation ensuring you cant like twice
                    if(!found){
                        likes.push(user_id);
                        posts[postId]['likes'] = likes;
                        transaction.update(docRef, {posts: posts})
                    }
                    
                }
            });
        })
        

        return {msg: "200 OK"};
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
        return { posts: handle.docs.map((doc) => { return doc.data() as post; })};
    }
}

    // const handle = await db.collection('profiles').doc(user);
   
    // const post = await Promise.resolve(handle.get());
    // console.log(post.data()['posts'][postId]) 

// async blobToDataURL(blob: Blob): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });

// return uploadString(photosRef, file, 'base64').then((snapshot) => { 
//     console.log('Uploaded a base64 string!');
//     console.log(typeof snapshot.ref);
//     const JSONFORM : JSON = JSON.parse(JSON.stringify(snapshot.ref, null, 2));
//     console.log(snapshot.metadata.fullPath)
// });