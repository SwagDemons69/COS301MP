import { NotificationRepository } from '@mp/api/notifications/data-access';
import { GetNotificationsEvent } from '@mp/api/notifications/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(GetNotificationsEvent)
export class GetNotificationsEventHandler implements IEventHandler<GetNotificationsEvent> {
    constructor(private readonly notificationRepository: NotificationRepository) {}

    async handle(event: GetNotificationsEvent) {
        return await this.notificationRepository.getNotifications(event.user_id);
    }
}

