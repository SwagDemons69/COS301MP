import { NotificationService } from "@mp/api/notifications/feature";
import { GetNotificationsRequest, GetNotificationsResponse } from "@mp/api/notifications/util";
import { SendNotificationRequest, SendNotificationReponse } from "@mp/api/notifications/util";
import * as functions from "firebase-functions";
import { CoreModule } from "../core.module"; 
import { NestFactory } from "@nestjs/core";

export const getNotifications : any = functions.https.onCall(async (data: GetNotificationsRequest) : Promise<GetNotificationsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const notificationService = app.get(NotificationService);
    return await notificationService.getNotifications(data);
});

export const sendNotification : any = functions.https.onCall(async (data: SendNotificationRequest) => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const notificationService = app.get(NotificationService);
    return await notificationService.sendNotification(data);
});
