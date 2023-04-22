import { NotificationModule as NotificationDataAccessModule } from "@mp/api/notifications/data-access";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { GetNotificationsHandler } from "./queries";
import { SendNotificationHandler } from "./commands";
import { NotificationService } from "./notifications.service";
import { SendNotificationEventHandler } from "./events";
import { GetNotificationsEventHandler } from "./events";
import { NotificationRepository } from "@mp/api/notifications/data-access";
export const QueryHandlers = [GetNotificationsHandler];
export const CommandHandlers = [SendNotificationHandler];
export const EventHandlers = [GetNotificationsEventHandler, SendNotificationEventHandler];

@Module({
    imports: [NotificationDataAccessModule, CqrsModule],
    providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers, NotificationService, NotificationRepository],
    exports: [NotificationService]
})
export class NotificationModule {}