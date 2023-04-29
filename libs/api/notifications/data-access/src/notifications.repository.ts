import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { GetNotificationsResponse } from '@mp/api/notifications/util';
import { SendNotificationRequest, SendNotificationReponse } from '@mp/api/notifications/util';
import { notification } from '@mp/api/notifications/util';
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

        const { userId, notification } = sendNotificationRequest;

        // add the notification to the user's notifications array
        const userRef = await admin.firestore().collection('users').doc(userId);
        await userRef.update({
          notifications: admin.firestore.FieldValue.arrayUnion(notification),
        });
    
        return { success: true };
    }
    
    async getNotifications(userId: string): Promise<GetNotificationsResponse> {
        // get the user's notifications array
        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        const notifications = userDoc.get('notifications') || [];
    
        return { notifications };
      }
}