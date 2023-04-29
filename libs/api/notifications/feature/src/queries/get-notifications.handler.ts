import { NotificationRepository } from "@mp/api/notifications/data-access";
import { GetNotificationsQuery, GetNotificationsResponse } from "@mp/api/notifications/util";
import { QueryHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

@QueryHandler(GetNotificationsQuery)
export class GetNotificationsHandler implements ICommandHandler<GetNotificationsQuery, GetNotificationsResponse> {
    constructor(private readonly publisher : EventPublisher ,private readonly notificationRepository: NotificationRepository) {}

    async execute(query: GetNotificationsQuery): Promise<GetNotificationsResponse> {
        console.log(`Async ${query.constructor.name}...`);
        return await this.notificationRepository.getNotifications(query.getNotifications.userId);
    }
}
