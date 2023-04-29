import { DeleteNotificationRequest, DeleteNotificationResponse, HandleFollowRequest, HandlerFollowResponse } from '@mp/api/notifications/util';
import * as admin from 'firebase-admin';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { user_profile } from '@mp/api/profiles/util';
//Im lazy

export const DeleteNotification = functions.https.onCall(
    async (request: DeleteNotificationRequest):   Promise<DeleteNotificationResponse> => {
        const notifcationsRef = admin.firestore().collection(`profiles/${request.user_id}/notifications`).doc(request.notification_id).delete();
        return { msg: "200 OK, Notification deleted."};
    }
);

export const HandleFollow = functions.https.onCall(
    async (request: HandleFollowRequest):   Promise<HandlerFollowResponse> => {
                const requesterRef = admin.firestore().collection('profiles').doc(request.requester);
                const requesterData = await requesterRef.get();
                const requester = requesterData.data() as user_profile;

                const requesteeRef = admin.firestore().collection('profiles').doc(request.requestee);
                const requesteeData = await requesteeRef.get();
                const requestee = requesteeData.data() as user_profile;

        if(request.flag){
                //Add requester to followers of requestee
                const followersRef = admin.firestore().collection(`profiles/${requestee.user_id}/followers`).doc(requester.user_id);
                followersRef.set({user: requester.username, image: requester.profilePicturePath});
                const requestee2 = admin.firestore().collection("profiles").doc(requestee.user_id);
                let followerCount = (await requestee2.get()).data()?.['followers'];
                await requestee2.set({followers: ++followerCount}, { merge: true });

                //Add requestee to following of requester
                const followersRefRequester = admin.firestore().collection(`profiles/${requester.user_id}/following`).doc(requestee.user_id);
                followersRefRequester.set({user: requestee.username, image: requestee.profilePicturePath});
                const requester2 = admin.firestore().collection("profiles").doc(requester.user_id);
                let followingCount = (await requester2.get()).data()?.['following'];
                await requester2.set({following: ++followingCount}, { merge: true });
        }
                //Delete Follow Request
                await admin.firestore().collection(`profiles/${requestee.user_id}/follow-requests`).doc(requester.user_id).delete();
        
        return { msg : "Follow Request " + ((request.flag) ? "Accepted": "Denied")};
        
    }
);