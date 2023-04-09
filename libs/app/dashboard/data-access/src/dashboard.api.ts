import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
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
}
