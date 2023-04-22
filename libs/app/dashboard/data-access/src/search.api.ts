import { Injectable } from '@angular/core';
import { doc, docData, Firestore, snapshotEqual } from '@angular/fire/firestore';
import { SearchRequest, SearchResponse} from '@mp/api/search/util';
import { Functions, getFunctions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';

@Injectable()
export class SearchApi {
  constructor(private readonly functions: Functions) {}

  async search(request: SearchRequest): Promise<SearchResponse> {
    const ret = await httpsCallable<SearchRequest, SearchResponse>(this.functions, 'search')(request).catch(e => {
      console.log(e);
    });

    if(ret && typeof ret.data !== 'undefined'){
      var test = ret.data as SearchResponse
      console.log(test);
      return ret.data as SearchResponse
    }
    else{
      throw new Error('Search function returned an invalid response');
    }
  }
}
