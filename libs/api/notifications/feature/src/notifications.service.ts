// write service functions here
import { SendNotificationRequest, SendNotificationCommand, SendNotificationEvent, SendNotificationReponse } from '@mp/api/notifications/util';
import { GetNotificationsRequest, GetNotificationsQuery, GetNotificationsResponse, GetNotificationsEvent } from '@mp/api/notifications/util';
import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus, EventBus } from '@nestjs/cqrs';

@Injectable()
export class NotificationService {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  async getNotifications(request: GetNotificationsRequest): Promise<GetNotificationsResponse> {
    return await this.queryBus.execute<GetNotificationsQuery, GetNotificationsResponse>(new GetNotificationsQuery(request));
  }

  async sendNotification(request: SendNotificationRequest): Promise<SendNotificationReponse> {
    return await this.commandBus.execute<SendNotificationCommand, SendNotificationReponse>(new SendNotificationCommand(request));
  }
}
