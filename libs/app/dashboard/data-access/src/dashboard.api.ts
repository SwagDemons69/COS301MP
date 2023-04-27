import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { GetBlipContentRequest, GetBlipContentResponse, GetRecommendedPostsRequest, GetRecommendedPostsResponse, GetTrendingPostsRequest, GetTrendingPostsResponse } from '@mp/api/dashboard/util';
import { post } from '@mp/api/home/util';

@Injectable()
export class DashboardApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  post$(id: string) {
    const docRef = doc(
      this.firestore,
      `posts/${id}`
    ).withConverter<post>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as post;
      },
      toFirestore: (it: post) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  //===========================================================
  // CLOUD FUNCTIONS
  //===========================================================

  async GetRecommendedPosts(request: GetRecommendedPostsRequest){
    return await httpsCallable<GetRecommendedPostsRequest, GetRecommendedPostsResponse>(this.functions, 'GetRecommendedPosts')(request);
  }

  async GetTrendingPosts(request: GetTrendingPostsRequest) {
    return await httpsCallable<GetTrendingPostsRequest, GetTrendingPostsResponse>(this.functions, 'GetTrendingPosts')(request);
  }

  async GetBlipContent(request: GetBlipContentRequest){
    return await httpsCallable<GetBlipContentRequest, GetBlipContentResponse>(this.functions, 'GetBlipContent')(request);
  }

}
