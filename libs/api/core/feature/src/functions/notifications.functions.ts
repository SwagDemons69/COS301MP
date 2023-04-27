// import { NotificationService } from "@mp/api/notifications/feature";
// import { GetNotificationsRequest, GetNotificationsResponse } from "@mp/api/notifications/util";
// //, SendNotificationRequest , SendNotificationReponse 
// import { NestFactory } from "@nestjs/core";
// import * as functions from "firebase-functions";
// import { CoreModule } from "../core.module"; 



// export const getNotifications = functions.https.onCall(async (data: GetNotificationsRequest) : Promise<GetNotificationsResponse> => {
//     const app = await NestFactory.createApplicationContext(CoreModule);
//     const notificationService = app.get(NotificationService);
//     return await notificationService.getNotifications(data);
// });



// export const sendNotification = functions.https.onCall(async (data: SendNotificationRequest) => {
//     const app = await NestFactory.createApplicationContext(CoreModule);
//     const notificationService = app.get(NotificationService);
//     return await notificationService.sendNotification(data);
// });


//general search for posts/people

import { NotificationService } from "@mp/api/notifications/feature";
import { GetNotificationsRequest, GetNotificationsResponse} from "@mp/api/notifications/util";
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

// export const search: any = functions.https.onCall(
//   async ( request: SearchRequest): Promise<SearchResponse> => {
//     const app = await NestFactory.createApplicationContext(CoreModule);
//     const service = app.get(SearchService);
//     return service.search(request);
//   }
// );


export const getNotifications = functions.https.onCall(
  async (request: GetNotificationsRequest) : Promise<GetNotificationsResponse> => {
  const app = await NestFactory.createApplicationContext(CoreModule);
  const notificationService = app.get(NotificationService);
  return await notificationService.getNotifications(request);
});
