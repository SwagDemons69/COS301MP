import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { GetBlipContentRequest, GetBlipContentResponse, GetGraveyardResponse, GetRecommendedPostsRequest, GetRecommendedPostsResponse, GetTrendingPostsRequest, GetTrendingPostsResponse } from '@mp/api/dashboard/util';
import { post } from '@mp/api/home/util';
import { user_profile } from '@mp/api/profiles/util';

@Injectable()
export class DashboardApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  profiles$(id: string) {
    const docRef = doc(
      this.firestore,
      `profiles/${id}`
    ).withConverter<user_profile>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as user_profile;
      },
      toFirestore: (it: user_profile) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  //===========================================================
  // CLOUD FUNCTIONS
  //===========================================================

  async GetRecommendedPosts(request: GetRecommendedPostsRequest){
    console.log(request.users + " @@@@")
    const response = await httpsCallable<GetRecommendedPostsRequest, GetRecommendedPostsResponse>(this.functions, 'GetRecommendedPosts')(request);
    console.log("RESPONSE2")
    return response;
  }

  async GetTrendingPosts(request: GetTrendingPostsRequest) {
    return await httpsCallable<GetTrendingPostsRequest, GetTrendingPostsResponse>(this.functions, 'GetTrendingPosts')(request);
  }

  async GetBlipContent(request: GetBlipContentRequest){
    return await httpsCallable<GetBlipContentRequest, GetBlipContentResponse>(this.functions, 'GetBlipContent')(request);
  }

  async GetGraveyard(){
    return (await httpsCallable<void, GetGraveyardResponse>(this.functions, 'GetGraveyard')()).data.profiles;
  }

}
