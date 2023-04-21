import { Injectable } from '@angular/core';
import { doc, docData, Firestore, snapshotEqual } from '@angular/fire/firestore';
import { SearchRequest, SearchResponse} from '@mp/api/search/util';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { post } from '@mp/api/post/util';
import { IProfile } from '@mp/api/profiles/util';

@Injectable()
export class SearchApi {
  constructor(private readonly functions: Functions) {}
  // constructor( 
  //     private readonly firestore: Firestore,
  //     private readonly functions: Functions
  //   ) {}

  async search(request: SearchRequest) {
    // const users = doc(this.firestore, `users/${request}`).withConverter<IProfile>({fromFirestore: (snapshot) => {return snapshot.data() as IProfile;},toFirestore: (it: IProfile) => it,});
    // const posts = doc(this.firestore, `users/user/posts/post/caption/${request}`).withConverter<post>({fromFirestore: (snapshot) => {return snapshot.data() as post;},toFirestore: (it: post) => it,});
    // return docData(docRef, { idField: 'id' });
    return await httpsCallable<SearchRequest, SearchResponse>(this.functions, 'Search')(request).catch(e => {
      console.log(e);
    });
  }
}
