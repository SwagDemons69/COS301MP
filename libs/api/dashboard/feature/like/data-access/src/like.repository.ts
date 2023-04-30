// import { IProfile } from '@mp/api/feed/util';
import { Injectable } from '@nestjs/common';
// import * as admin from 'firebase-admin';

@Injectable()
export class LikeRepository {
  // async findOne(profile: IProfile) {
  //   return await admin
  //     .firestore()
  //     .collection('profiles')
  //     .withConverter<IProfile>({
  //       fromFirestore: (snapshot) => {
  //         return snapshot.data() as IProfile;
  //       },
  //       toFirestore: (it: IProfile) => it,
  //     })
  //     .doc(profile.userId)
  //     .get();
  // }

  // maybe add post id
  async likePost() {
    // Remove password field if present
    // delete profile.accountDetails?.password;
    // return await admin
    //   .firestore()
    //   .collection('profiles')
    //   .doc(profile.userId)
    //   .create(profile);
  }

  // maybe comment id
  async LikeComment() {
  //   // Remove password field if present
  //   delete profile.accountDetails?.password;
  //   return await admin
  //     .firestore()
  //     .collection('profiles')
  //     .doc(profile.userId)
  //     .set(profile, { merge: true });
  }
}
