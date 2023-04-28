import { Injectable } from '@nestjs/common';
import { getStorage, ref, uploadBytes, connectStorageEmulator, uploadString } from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { GetNotificationsResponse } from '@mp/api/notifications/util';
import { SendNotificationRequest, SendNotificationReponse } from '@mp/api/notifications/util';
import { notification, NotificationType, postLikedNotification } from '@mp/api/notifications/util';
import { ReplyFollowRequest, FollowRequestReponse } from '@mp/api/notifications/util';
// import { Timestamp, FieldValue } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { query } from '@firebase/firestore';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import firebase from 'firebase/app';
@Injectable()
export class NotificationRepository {
    constructor() {
        // leave empty
    }

    async sendNotification(sendNotificationRequest : SendNotificationRequest): Promise<SendNotificationReponse> {
        // create a notification object and add it to the firebase collection for notifications
        // create a document in the firebase collection for notifications in user collection
        // add the notification id to the user's notifications array

        // const { userId, notification } = sendNotificationRequest;

        // // add the notification to the user's notifications array
        // const userRef = await admin.firestore().collection('users').doc(userId);
        // await userRef.update({
        //   notifications: admin.firestore.FieldValue.arrayUnion(notification),
        // });
        try {
          const { notification } = sendNotificationRequest;

          notification.seen = false;
          console.log("seen is set");
          notification.timestamp = Timestamp.now();
          console.log("Time is set");
          // notification.notification_id = admin.firestore().collection('profiles').doc().id;

          const notificationRef = await admin.firestore().collection('profiles').doc(notification.user_id).collection('notifications').add(notification);

          const profileDoc = admin.firestore().collection('profiles').doc(notification.user_id);

          const profileData = await profileDoc.get();

          await profileDoc.update({
            notifications: [...profileData.get('notifications'), notificationRef.id]
          });

          return { success: true };
        } catch (error) {
          console.error('Error sending notification', error);
          return { success: false };
        }
    }


    async replyFollowRequest(request : ReplyFollowRequest): Promise<FollowRequestReponse> {
      // create a notification object and add it to the firebase collection for notifications
      // create a document in the firebase collection for notifications in user collection
      // add the notification id to the user's notifications array

      // const { userId, notification } = sendNotificationRequest;

      // // add the notification to the user's notifications array
      // const userRef = await admin.firestore().collection('users').doc(userId);
      // await userRef.update({
      //   notifications: admin.firestore.FieldValue.arrayUnion(notification),
      // });

      console.error('Reply Follow Request not implemented!');

      return { success: false };
  }


    async getNotifications(user_id: string): Promise<GetNotificationsResponse> {
      console.log("trying to find notifications for: " + user_id);
      const notifications: notification[] = [];

      try {
        const docRef = admin.firestore().collection('profiles').doc(user_id).collection('notifications');
        const querySnapshot = await docRef.orderBy('timestamp', 'desc').get();

        querySnapshot.forEach((doc) => {
          notifications.push(doc.data() as notification);
        });

        return { notifications };
      } catch (error) {
        console.error('Error getting notifications', error);
        return { notifications: [] };
      }
    }


}
