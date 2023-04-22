import { Injectable } from '@angular/core';
import { doc, docData, Firestore, snapshotEqual } from '@angular/fire/firestore';
import { SearchRequest, SearchResponse} from '@mp/api/search/util';
import { Functions, getFunctions, httpsCallable } from '@angular/fire/functions';

@Injectable()
export class SearchApi {
  constructor(private readonly functions: Functions) {}

  async search(request: SearchRequest): Promise<SearchResponse> {
    // var data: any;
    // const ret = await httpsCallable<SearchRequest, SearchResponse>(this.functions, 'search')(request).then((result) => {
    //     data = result.data;
    //   }).catch(e => {
    //   console.log(e);
    // });

    // console.log("YOOOO " + data);
    // return data;

    const functions = getFunctions();
    var data: any;
    const searchFunction = httpsCallable(this.functions, 'search');
    searchFunction(request).then((result) => {
        data = result.data;
        console.log("Returning data ===> " + result)
      })

      return data;
  }
}
