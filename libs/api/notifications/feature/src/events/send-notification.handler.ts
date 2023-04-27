import { NotificationRepository } from '@mp/api/notifications/data-access';
import { SendNotificationEvent } from '@mp/api/notifications/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SendNotificationEvent)
export class SendNotificationEventHandler implements IEventHandler<SendNotificationEvent> {
    constructor(private readonly notificationRepository: NotificationRepository) {}

    async handle(event: SendNotificationEvent) {
        return await this.notificationRepository.sendNotification(event.sendNotification);
    }
}