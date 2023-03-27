import { IProfile } from '@mp/api/profiles/util';
import { user_profile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ProfilesRepository {
  async findOne(profile: user_profile) {
    return await admin
      .firestore()
      .collection('profiles')
      .withConverter<user_profile>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as user_profile;
        },
        toFirestore: (it: user_profile) => it,
      })
      .doc(profile.user_id)
      .get();
  }

  async createProfile(profile: user_profile) {
    // Remove password field if present
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.user_id)
      .create(profile);
  }

  async updateProfile(profile: IProfile) {
    // Remove password field if present
    delete profile.accountDetails?.password;
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.userId)
      .set(profile, { merge: true });
  }

  // async checkForUser(profile_user_id : string){
  //   const handle = await admin.firestore().collection('profiles').get();
  //   let profile;
  //   handle.forEach((doc) => {
  //   //const data = doc.data();
  //   if(doc.id === profile_user_id)
  //     profile = doc.data();
  //   });
  //   return profile;
  // }


  async findUser(profile: user_profile) {
    return await admin
      .firestore()
      .collection('profiles')
      .withConverter<user_profile>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as user_profile;
        },
        toFirestore: (it: user_profile) => it,
      })
      .doc(profile.user_id)
      .get();
  }
}


