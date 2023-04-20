import { Injectable } from '@angular/core';
import { AddPhotoRequest, AddPhotoResponse, CreatePostChildCommentRequest, CreatePostChildCommentResponse, CreatePostLikeRequest, CreatePostLikeResponse, CreatePostRequest, CreatePostResponse, CreatePostRootCommentRequest, CreatePostRootCommentResponse } from '@mp/api/post/util';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable()
export class PostApi {
    constructor(private readonly functions: Functions) {}

    async UploadPostToCloudStorage(request: AddPhotoRequest){
        return await httpsCallable<AddPhotoRequest, AddPhotoResponse>(this.functions, 'AddPhotoToCloudStorage')(request);
    }

    async UploadPostToFirestore(request: CreatePostRequest){
        return await httpsCallable<CreatePostRequest, CreatePostResponse>(this.functions, 'AddPostToFirestore')(request);
    }

    async CreatePostLike(request: CreatePostLikeRequest){
        return await httpsCallable<CreatePostLikeRequest, CreatePostLikeResponse>(this.functions, 'CreatePostLike')(request);
    }

    async CreatePostRootComment(request: CreatePostRootCommentRequest){
        return await httpsCallable<CreatePostRootCommentRequest, CreatePostRootCommentResponse>(this.functions, 'CreateRootComment')(request);
    }
    
    async CreatePostChildComment(request: CreatePostChildCommentRequest){
        return await httpsCallable<CreatePostChildCommentRequest, CreatePostChildCommentResponse>(this.functions, 'CreateChildComment')(request);
    }
}