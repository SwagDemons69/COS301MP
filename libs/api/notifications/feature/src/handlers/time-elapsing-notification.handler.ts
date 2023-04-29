import { TimeElapsingNotificationCommand } from "../util/commands/";

@CommandHandler(TimeElapsingNotificationCommand)
export class TimeElapsingNotificationHandler  implements ICommandHandler<TimeElapsingNotificationCommand>{
    constructor( private readonly notificationService: NotificationService,
                 private readonly eventBus: EventBus,) {}


     async execute(command: TimeElapsingNotificationCommand) {
          const {id ,recipientId, authorID, postId,title,type, createdAt } = event;
            const notification = new Notification(recipientId, type, createdAt);
        const event = new NotificationCreatedEvent();
        event.userId = notification.userId;
        event.displayName = notification.displayName;
        event.timeStamp = notification.timeStamp;
        this.eventBus.publish(event);

}
