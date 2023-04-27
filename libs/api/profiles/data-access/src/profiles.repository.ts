import { user_profile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { addFollowerRequest } from '@mp/api/profiles/util';

@Injectable()
export class ProfilesRepository {

  async findOne(profile: user_profile) {
    console.log(profile.user_id)
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

  async findUser(user_id : string) {
    console.log("USER ID: " + user_id)
    return await admin
    .firestore()
    .collection('profiles')
    .withConverter<user_profile>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as user_profile;
      },
      toFirestore: (it: user_profile) => it,
    })
    .doc(user_id)
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

  async EditProfile(profile: user_profile) {
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.user_id)
      .set(profile, { merge: true });
  }

  async addFollower(request : addFollowerRequest){
    console.log(request)
    const requesteeRef = admin.firestore().collection('profiles').doc(request.requestee.user.user_id); 
    const requesteeProfile = await requesteeRef.get();
    const requestee = requesteeProfile.data() as user_profile;
    console.log(requestee)

    if(requestee.notPublic){
      const followRequestsRef = admin.firestore().collection(`profiles/${requestee.user_id}/follow-requests`).doc(request.requester.user_id);
      followRequestsRef.set({user: request.requester.username, image: request.requester.profilePicturePath});
      return {result : true};
    }
    else{
      const followersRef = admin.firestore().collection(`profiles/${requestee.user_id}/followers`).doc(request.requester.user_id);
      followersRef.set({user: request.requester.username, image: request.requester.profilePicturePath});
      return {result : true};
    }
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

}

