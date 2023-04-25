// write service functions here
import { SendNotificationRequest, SendNotificationCommand, SendNotificationEvent, SendNotificationReponse } from '@mp/api/notifications/util';
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

  async sendNotification(sendNotificationRequest: SendNotificationRequest): Promise<SendNotificationReponse> {
    const sendNotificationCommand = new SendNotificationCommand(sendNotificationRequest);
    return await this.queryBus.execute(sendNotificationCommand);
  }
}
