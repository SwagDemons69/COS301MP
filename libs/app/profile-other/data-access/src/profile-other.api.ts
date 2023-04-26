import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { addFollowerRequest, addFollowerResponse } from '@mp/api/profiles/util';

@Injectable()
export class profileOtherAPI {
  constructor(private readonly functions: Functions) {}

  async addFollower(request : addFollowerRequest): Promise<addFollowerResponse> {
    const ret = await httpsCallable<addFollowerRequest, addFollowerResponse>(this.functions, 'addFollower')(request).catch(e => {
      console.log(e);
    });

    if(ret && typeof ret.data !== 'undefined'){
      var test = ret.data as addFollowerResponse
      return ret.data as addFollowerResponse
    }
    else{
      throw new Error('addFollower function returned no response');
    }
  }
}