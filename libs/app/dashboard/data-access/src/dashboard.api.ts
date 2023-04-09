import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { user_profile } from '@mp/api/profiles/util';

@Injectable()
export class DashboardApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  profile$(id: string) {
    const docRef = doc(
      this.firestore,
      `dashboard/${id}`
    ).withConverter<user_profile>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as user_profile;
      },
      toFirestore: (it: user_profile) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  // async updateAccountDetails(request: IUpdateAccountDetailsRequest) {
  //   return await httpsCallable<
  //     IUpdateAccountDetailsRequest,
  //     IUpdateAccountDetailsResponse
  //   >(
  //     this.functions,
  //     'updateAccountDetails'
  //   )(request);
  // }
}
