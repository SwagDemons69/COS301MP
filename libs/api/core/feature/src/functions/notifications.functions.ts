import { DeleteNotificationRequest, DeleteNotificationResponse } from '@mp/api/notifications/util';
import * as admin from 'firebase-admin';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
//Im lazy

export const DeleteNotification = functions.https.onCall(
    async (request: DeleteNotificationRequest):   Promise<DeleteNotificationResponse> => {
        const notifcationsRef = admin.firestore().collection(`profiles/${request.user_id}/notifications`).doc(request.notification_id).delete();
        return { msg: "200 OK, Notification deleted."};
    }
);