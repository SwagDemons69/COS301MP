import { NotificationService } from "@mp/api/notifications/feature";
import { GetNotificationsRequest, GetNotificationsResponse, SendNotificationRequest, SendNotificationReponse} from "@mp/api/notifications/util";
import { ReplyFollowRequest, FollowRequestReponse } from "@mp/api/notifications/util";
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const sendNotification = functions.https.onCall(
  async (request: SendNotificationRequest): Promise<SendNotificationReponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(NotificationService);
    return service.sendNotification(request);
  }
);

export const getNotifications = functions.https.onCall(
  async (request: GetNotificationsRequest) : Promise<GetNotificationsResponse> => {
  const app = await NestFactory.createApplicationContext(CoreModule);
  const notificationService = app.get(NotificationService);
  return await notificationService.getNotifications(request);
});

export const replyFollowRequest = functions.https.onCall(
  async (request: ReplyFollowRequest) : Promise<FollowRequestReponse> => {
  const app = await NestFactory.createApplicationContext(CoreModule);
  const notificationService = app.get(NotificationService);
  return await notificationService.replyFollowRequest(request);
});
