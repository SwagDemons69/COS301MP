import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { EditProfileRequest, EditProfileResponse, user_profile } from '@mp/api/profiles/util';
import { post } from '@mp/api/home/util'

const pId = "1";

@Injectable()
export class ProfilesApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  profile$(id: string) {
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



  posts$(id: string) {
    console.log("FIRESTORE POST")
    const docRef = doc(this.firestore,`posts/${pId}`).withConverter<post>({
      fromFirestore: (snapshot) => { return snapshot.data() as post; },
      toFirestore: (it: post) => it,});
    return docData(docRef, { idField: 'id' });
  }

  // allposts$(user_id : string){
  //   const docRef = doc(this.firestore, 'profiles/${user_id}/posts').withConverter<post[]>({
  //     fromFirestore: (snapshot) => {return snapshot.data() as post[]; },
  //     toFirestore: (it: post[]) => it,})
  //   return docData(docRef,{});
  // }

//==========================================================================
// CLOUD FUNCTIONS
//==========================================================================

  // async updateAccountDetails(request: IUpdateAccountDetailsRequest) {
  //   return await httpsCallable<
  //     IUpdateAccountDetailsRequest,
  //     IUpdateAccountDetailsResponse
  //   >(
  //     this.functions,
  //     'updateAccountDetails'
  //   )(request);
  // }

  async EditProfile(request: EditProfileRequest){
    return await httpsCallable<EditProfileRequest, EditProfileResponse>(this.functions, 'EditProfile')(request);
  }
}
