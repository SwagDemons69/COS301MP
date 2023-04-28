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
import { query } from '@firebase/firestore';

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
      console.log("trying to find notifications for: " + user_id);
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
      let notifications: notification[] = [];

      try {
        const querySnapshot = await admin.firestore().collection('profiles').doc(user_id).get();
        notifications = querySnapshot.data()?.['notifications'];
        console.log("querySnapshot: " + querySnapshot.data()?.['notifications']); // an error, .forEach is not a function?Yeah at the bottom, commented it out
        //it's working now. 

        //you wanted to order it by timestamp though 
        
        // const querySnapshot = await admin.firestore().collection('profiles').get();
        //I think I know the problem
        // console.log("size: " + querySnapshot.size)//see terminal Mito. it didn't find any. Yeah
        // //search for profile
        // querySnapshot.forEach((doc) => {
        //     console.log("got one!");//Mito, look at the comment above, looking at terminal
        //     console.log("user_id is:" + doc.data()?.['user_id']);
        //     if(doc.data()?.['user_id'] == user_id){
        //       console.log("found!");// how many terminals do you have up. 3 . Made themall rea wri I was on the wrong terminal, im looking at emulators
        //      //yeah look at emulators
        //       notifications = doc.data()?.['notifications'];
        //       console.log("notifications: " + notifications);

        //       //gonna run thunder client now, im watching closely, thats a lot of notification objects
        //       // it worked!!! I'll send a screenshot on WhatsApp
        //     }
        // });///bruh!!1 the hell is that what is happenning???e I was running it through Thunder client. It seems the user_id is that long string
      //let's do this step by step got it


      //your code was working, it's just the user_id was wrong, in my input, i was scared for a sec
        // querySnapshot.forEach((doc) => {
        //   console.log("got one!")
        //   notifications.push(doc.data() as notification);
        // });
      
        return { notifications };
      } catch (error) {
        console.error('Error getting notifications', error);
        return { notifications: [] };
      }
    }


}