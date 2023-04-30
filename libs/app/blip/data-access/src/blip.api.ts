import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { CreatePostLikeRequest, CreatePostLikeResponse, CreatePostRootCommentRequest, CreatePostRootCommentResponse, CreatePostChildCommentRequest, CreatePostChildCommentResponse } from '@mp/api/post/util';
import { post } from '@mp/api/home/util';

@Injectable()
export class blipAPI {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  async likePost(request: CreatePostLikeRequest){
    return await httpsCallable<CreatePostLikeRequest, CreatePostLikeResponse>(this.functions, 'CreatePostLike')(request);
  }

  async dislikePost(request: CreatePostLikeRequest){
    console.log("API")
    return await httpsCallable<CreatePostLikeRequest, CreatePostLikeResponse>(this.functions, 'CreatePostDislike')(request);
  }

  async addRootComment(request: CreatePostRootCommentRequest){
    return await httpsCallable<CreatePostRootCommentRequest, CreatePostRootCommentResponse>(this.functions, 'CreateRootComment')(request);
  }

  async addChildComment(request: CreatePostChildCommentRequest){
    return await httpsCallable<CreatePostChildCommentRequest, CreatePostChildCommentResponse>(this.functions, 'CreateChildComment')(request);
  }

}
