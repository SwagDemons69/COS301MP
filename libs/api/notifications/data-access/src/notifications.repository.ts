import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { GetNotificationsResponse } from '@mp/api/notifications/util';
// import { GetNotificationsResponse } from '@mp/api/notifications/util';
import { SendNotificationRequest, SendNotificationReponse } from '@mp/api/notifications/util';
import { notification, NotificationType, postLikedNotification } from '@mp/api/notifications/util';
import { ReplyFollowRequest, FollowRequestReponse } from '@mp/api/notifications/util';
import { Timestamp } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

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
        const { userId, notification } = sendNotificationRequest;

        try {
          const notificationRef = await admin.firestore().collection('profiles').doc(userId).collection('notifications').add(notification);
        
          await admin.firestore().collection('profiles').doc(userId).update({
            notifications: admin.firestore.FieldValue.arrayUnion(notificationRef.id)
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
 
      // const notification : postLikedNotification = {
      //   user_id: "exampleUserId",
      //   type: NotificationType.PostLikedNotification,
      //   seen: false,
      //   timestamp: Timestamp.fromDate(new Date()),
      //   notification_id: "exampleNotificationId",
      //   liker_id: "exampleLikerId",
      //   post_id: "examplePostId"
      // }
      // const notifications: notification[] = [notification];
      // return { notifications };
      const notifications: notification[] = [];

      try {
        const querySnapshot = await admin.firestore().collection('profiles').doc(user_id).collection('notifications').orderBy('timestamp', 'desc').get();
      
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