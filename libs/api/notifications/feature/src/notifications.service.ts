// write service functions here
import { SendNotificationRequest, SendNotificationCommand, SendNotificationEvent } from '@mp/api/notifications/util';
import { GetNotificationsRequest, GetNotificationsQuery, GetNotificationsResponse, GetNotificationsEvent  } from '@mp/api/notifications/util';
import { Injectable } from '@angular/core';
import { QueryBus, CommandBus, EventBus } from '@nestjs/cqrs';

@Injectable()
export class NotificationService {
  constructor(private readonly queryBus: QueryBus) {}

  async getNotifications(getNotificationsRequest: GetNotificationsRequest): Promise<GetNotificationsResponse> {
    const getNotificationsQuery = new GetNotificationsQuery(getNotificationsRequest);
    return await this.queryBus.execute(getNotificationsQuery);
  }

  async sendNotification(sendNotificationRequest: SendNotificationRequest): Promise<void> {
    const sendNotificationCommand = new SendNotificationCommand(sendNotificationRequest);
    return await this.queryBus.execute(sendNotificationCommand);
  }

   async createNotification(userId, displayName, type): Promise<Notification> {
      const notification = new Notification();
      notification.recipientId = userId;
      notification.text = displayName;
      notification.type = type;
      notification.createdAt = new Date().toISOString();
    /*  const docRef = await this.firestoreService
        .collection('notifications')
        .add(Object.assign({}, notification));
      notification.id = docRef.id;*/
      return notification;
    }


    /*async sendNotification(notification: Notification) {
        const message: admin.messaging.Message = {
          notification: {
            title: notification.title,
            type: notification.type,
          },
          data: {
            postId: notification.postId,
            recipientId: notification.recipientId,
          },
          authorId: notification.authorId,
        };

        try {
          const response = await admin.messaging().send(message);
          console.log(`Notification sent successfully: ${response}`);
        } catch (error) {
          console.error(`Error sending notification: ${error}`);
        }
      }*/
}
