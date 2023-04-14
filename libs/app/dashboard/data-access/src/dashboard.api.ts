import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';
import { post } from '@mp/api/home/util';
import { map, Observable } from 'rxjs';
import { from } from 'rxjs';  
import 'firebase/compat/database';
import 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';@Injectable()


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

  posts$(): Observable<post[]> {
    const postsRef = collection(this.firestore, 'posts');
    return from(getDocs(postsRef)).pipe(
      map((querySnapshot) => querySnapshot.docs.map((doc) => ({
        post_id : doc.id,
        user_id : doc.data()['user_id'],
        content : doc.data()['content'],
        caption : doc.data()['caption'],
        likes : doc.data()['likes'],
        timeStamp : doc.data()['timeStamp'],
        shares : doc.data()['shares'],
        kronos : doc.data()['kronos'],
        comments : doc.data()['comments'],
        categories : doc.data()['categories'],
        taggedUsers : doc.data()['taggedUsers']
      })))
    );
  }
}



