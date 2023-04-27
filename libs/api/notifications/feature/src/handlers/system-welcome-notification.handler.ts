import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SystemWelcomeNotificationCommand, IAuth } from '@mp/api/notifications/util';
import { Timestamp } from 'firebase-admin/firestore';
import { Auth } from '../models';
import { NotificationService } from '../services';
import { CqrsModule } from '@nestjs/cqrs';

@CommandHandler(SystemWelcomeNotificationCommand)
export class SystemWelcomeNotificationHandler implements ICommandHandler<SystemWelcomeNotificationCommand> {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SystemWelcomeNotificationCommand) {
     /*   const {id ,recipientId, authorID, postId,title,type, createdAt } = event;
        const notification = new Notification(recipientId, type, createdAt);*/
    const { userId, displayName, timeStamp } = command;
    const notification = await this.notificationService.createNotification( userId, displayName, timeStamp );
    const event = new NotificationCreatedEvent();
    event.userId = notification.userId;
    event.displayName = notification.displayName;
    event.timeStamp = notification.timeStamp;
    this.eventBus.publish(event);

    /*const user = await this.userService.getUserById(userId); //create user service
   // if (post.authorId !== authorId) {
      const notificationDto = new CreateNotificationDto();
      notificationDto.recipientId = user.authorId;
      notificationDto.text = `${user.displayName}  Welcome to twenty4, have a plentiful experience"`;
      await this.notificationService.createNotification(notificationDto);
      const notificationEvent = new NotificationCreatedEvent();
      notificationEvent.notificationId = notificationDto.id;
      notificationEvent.recipientId = post.authorId;
      notificationEvent.text = notificationDto.text;
      this.eventBus.publish(notificationEvent);*/
//  }
}
