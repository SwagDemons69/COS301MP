import {notificationService} from '../services/notification'

@EventsHandler(NotificationCreatedEvent)
export class NotificationCreatedEventHandler implements IEventHandler<NotificationCreatedEvent> {
  constructor(private repository: HeroRepository) {}


    async handle(event: NotificationCreatedEvent) {
      // Send notification to user

      const {id ,recipientId, authorID, postId,title,type, createdAt } = event;
      const notification = new Notification(recipientId, type, createdAt);
      notification.authorID = authorID;
      await notificationService.sendNotification(notification);
    }
}
