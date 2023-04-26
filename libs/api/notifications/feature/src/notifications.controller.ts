import { Controller, Get, Post, Body, Delete, Param, HttpException,HttpStatus} from '@nestjs/common';
import { NotificationService } from '../notification.service';
import { Notification } from '../util/interfaces/notification.interface';
import { SendNotificationRequest, SendNotificationCommand, SendNotificationEvent } from '@mp/api/notifications/util';
import { GetNotificationsRequest, GetNotificationsQuery, GetNotificationsResponse, GetNotificationsEvent  } from '@mp/api/notifications/util';


@Controller('controller/Notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get()
  getNotifications(getNotificationsRequest: GetNotificationsRequest): GetNotificationsResponse {
    try {
      return this.NotificationService.getNotifications(getNotificationsRequest);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post()
  createNotification(@Body() { userID, displayName, type }: Notification): Notification {
    try {
      notification: Notification = this.NotificationService.createNotification(userID, displayName, type);
      this.NotificationService.sendNotification(notification)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  /*
  @Delete(':notificationId')
  deleteTodo(@Param('notificationId') id: number): GetNotificationsResponse {
    try {
      return this.appService.deleteTask(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }*/
}
