import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { GetNotificationsResponse } from '@mp/api/notifications/util';
import { SendNotificationRequest, SendNotificationReponse } from '@mp/api/notifications/util';
import { notification } from '@mp/api/notifications/util';
import * as admin from 'firebase-admin';
// import { IProfile } from '@mp/api/profiles/util';
// import { post } from '@mp/api/post/util';

@Injectable()
export class NotificationRepository {

    async sendNotification(sendNotificationRequest : SendNotificationRequest): Promise<SendNotificationReponse> {
        // create a notification object and add it to the firebase collection for notifications
        // create a document in the firebase collection for notifications in user collection
        // add the notification id to the user's notifications array
        return {success: false};
    }
    
    async getNotifications(user_id: string): Promise<GetNotificationsResponse> {
        // get an array of notifications for a user from the firebase collection for notifications

        return {notifications: []};
    }
}