import { Injectable } from '@angular/core';
import { SearchRequest, SearchResponse} from '@mp/api/search/util';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable()
export class SearchApi {
  constructor(private readonly functions: Functions) {}

  async search(request: SearchRequest) {
    return await httpsCallable<SearchRequest, SearchResponse>(this.functions, 'Search')(request);
  }
}
