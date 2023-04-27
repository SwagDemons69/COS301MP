import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { CreatePostLikeRequest, CreatePostLikeResponse } from '@mp/api/post/util';
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

}
