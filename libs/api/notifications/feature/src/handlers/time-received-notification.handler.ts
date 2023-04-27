import { TimeElapsingNotificationCommand } from "../util/commands/";

@CommandHandler(TimeReceivedNotificationCommand)
export class TimeReceivedNotificationHandler  implements ICommandHandler<TimeReceivedNotificationCommand>{
    constructor( private readonly notificationService: NotificationService,
                 private readonly eventBus: EventBus,) {}


     async execute(command: TimeReceivedNotificationCommand) {
          const {id ,recipientId, authorID, postId,title,type, createdAt } = event;
            const notification = new Notification(recipientId, type, createdAt);
        const event = new NotificationCreatedEvent();
        event.userId = notification.userId;
        event.displayName = notification.displayName;
        event.timeStamp = notification.timeStamp;
        this.eventBus.publish(event);

}
