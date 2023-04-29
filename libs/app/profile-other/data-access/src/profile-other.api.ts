import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { addFollowerRequest, addFollowerResponse} from '@mp/api/profiles/util';
import { GetProfileStatsRequest, GetProfileStatsResponse } from '@mp/api/search/util';

@Injectable()
export class profileOtherAPI {
  constructor(private readonly functions: Functions) {}

  async addFollower(request : addFollowerRequest){
    return await httpsCallable<addFollowerRequest, addFollowerResponse>(this.functions, 'addFollower')(request); //.catch(e => {
  }


  async getProfileStats(request: GetProfileStatsRequest){
    return await httpsCallable<GetProfileStatsRequest, GetProfileStatsResponse>(this.functions, 'getProfileStats')(request);
  }
}