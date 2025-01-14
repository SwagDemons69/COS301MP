import { user_profile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { addFollowerRequest } from '@mp/api/profiles/util';
import { user } from '@mp/api/search/data-access';
import { notification } from '@mp/api/notifications/util'
import { Timestamp } from 'firebase-admin/firestore';
@Injectable()
export class ProfilesRepository {

  notification_id = ""

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

  async findUser(user_id : string) {
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
    this.notification_id = ""
    const requesteeRef = admin.firestore().collection('profiles').doc(request.requestee.user_id);
    const requesterRef = admin.firestore().collection('profiles').doc(request.requester.user_id)
    const requesteeProfile = await requesteeRef.get();
    const requesterProfile = await requesterRef.get();
    const requestee = requesteeProfile.data() as user_profile;
    const requester = requesterProfile.data() as user_profile;


    const followerRef = await admin.firestore().collection(`profiles/${request.requestee.user_id}/followers`).doc(request.requester.user_id).get();
    const followRequestsRef = await admin.firestore().collection(`profiles/${request.requestee.user_id}/follow-requests`).doc(request.requester.user_id).get();

    //Remove Follow
    if(followerRef.exists){
        //Remove requester from requestee follower list
        await admin.firestore().collection(`profiles/${request.requestee.user_id}/followers`).doc(request.requester.user_id).delete();
        const requestee2 = admin.firestore().collection("profiles").doc(request.requestee.user_id);
        let followerCount = (await requestee2.get()).data()?.['followers'];
        if(followerCount != 0)
          await requestee2.set({followers: --followerCount}, { merge: true });
       
        //Remove requestee from requester following list
        await admin.firestore().collection(`profiles/${request.requester.user_id}/following`).doc(request.requestee.user_id).delete();
        const requester2 = admin.firestore().collection("profiles").doc(request.requester.user_id);
        let followingCount = (await requester2.get()).data()?.['following'];
        if(followingCount != 0)
          await requester2.set({following: --followingCount}, { merge: true });
      }
    //Remove Follow Request
    else if(followRequestsRef.exists){
        await admin.firestore().collection(`profiles/${request.requestee.user_id}/follow-requests`).doc(request.requester.user_id).delete();
        //console.log(this.notification_id + " @@@@")
        if(request.notification_id)
          await admin.firestore().collection(`profiles/${request.requestee.user_id}/notifications`).doc(request.notification_id).delete();
    }
    else{
      //Add follower
      if(requestee.notPublic){
        const followRequestsRef = admin.firestore().collection(`profiles/${requestee.user_id}/follow-requests`).doc(request.requester.user_id);
        followRequestsRef.set({user: request.requester.username, image: request.requester.profilePicturePath});

        const notifcationsRef = admin.firestore().collection(`profiles/${requestee.user_id}/notifications`).doc();
        
        const noti: notification = {
          create_by_id: requester.user_id,
          notification_id: "",
          image: requester.profilePicturePath,
          type: "New Follow Request",
          username: requester.username,
          payload: "has requested to follow you",
          timestamp: Timestamp.now(),
          timeStampOrder: Timestamp.now().seconds.toString()
        }

        noti.notification_id = notifcationsRef.id;
        this.notification_id = noti.notification_id
        notifcationsRef.set(noti);
      
      }
      else{
        //Add requester to followers of requestee
        const followersRef = admin.firestore().collection(`profiles/${requestee.user_id}/followers`).doc(request.requester.user_id);
        followersRef.set({user: request.requester.username, image: request.requester.profilePicturePath});
        const requestee2 = admin.firestore().collection("profiles").doc(request.requestee.user_id);
        let followerCount = (await requestee2.get()).data()?.['followers'];
        await requestee2.set({followers: ++followerCount}, { merge: true });

        const notifcationsRef = admin.firestore().collection(`profiles/${requestee.user_id}/notifications`).doc();
        
        const noti: notification = {
          create_by_id: requester.user_id,
          notification_id: "",
          image: requester.profilePicturePath,
          type: "New Follower",
          username: requester.username,
          payload: "is now following you",
          timestamp: Timestamp.now(),
          timeStampOrder: Timestamp.now().seconds.toString()
        }

        noti.notification_id = notifcationsRef.id;
        this.notification_id = noti.notification_id
        notifcationsRef.set(noti);

        //Add requestee to following of requester
        const followersRefRequester = admin.firestore().collection(`profiles/${requester.user_id}/following`).doc(request.requestee.user_id);
        followersRefRequester.set({user: request.requestee.username, image: request.requestee.profilePicturePath});
        const requester2 = admin.firestore().collection("profiles").doc(request.requester.user_id);
        let followingCount = (await requester2.get()).data()?.['following'];
        await requester2.set({following: ++followingCount}, { merge: true });

      }
    }

    const followingRef = admin.firestore().collection(`profiles/${requestee.user_id}/following`).get();
    const followingCount = (await followingRef).docs.length;
    
    const followersRef2 = admin.firestore().collection(`profiles/${requestee.user_id}/followers`).get();
    const followerCount = (await followersRef2).docs.length;

    
    return {notification_id: this.notification_id, followingCount : followingCount, followerCount : followerCount};
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

