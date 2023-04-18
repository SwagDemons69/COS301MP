import { Injectable } from '@angular/core';
import { AddPhotoRequest, AddPhotoResponse, CreatePostRequest, CreatePostResponse } from '@mp/api/post/util';
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

}