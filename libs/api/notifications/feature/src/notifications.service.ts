// write service functions here
// import { SendNotificationRequest, SendNotificationCommand, SendNotificationEvent } from '@mp/api/notifications/util';
import { GetNotificationsRequest, GetNotificationsQuery, GetNotificationsResponse, GetNotificationsEvent  } from '@mp/api/notifications/util';
import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus, EventBus } from '@nestjs/cqrs';

// import { GetNotificationsQuery} from '@mp/api/notifications/util';

@Injectable()
export class NotificationService {
  constructor(private readonly queryBus: QueryBus) {}

  async getNotifications(request: GetNotificationsRequest): Promise<GetNotificationsResponse> {
    // const getNotificationsQuery = new GetNotificationsQuery(request);
    // return await this.queryBus.execute(getNotificationsQuery);

    return await this.queryBus.execute<GetNotificationsQuery, GetNotificationsResponse>(new GetNotificationsQuery(request));
  }

//   async sendNotification(request: SendNotificationRequest): Promise<SendNotificationResponse> {
//     const sendNotificationCommand = new SendNotificationCommand(sendNotificationRequest);
//     return await this.queryBus.execute(sendNotificationCommand);
//   }
}
