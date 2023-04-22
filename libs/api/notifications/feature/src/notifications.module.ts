import { NotificationModule as NotificationDataAccessModule } from "@mp/api/notifications/data-access";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { GetNotificationsHandler } from "./queries";
import { SendNotificationHandler } from "./commands";
import { NotificationService } from "./notification.service";
// import { SendNotificationEventHandler } from 
// export const QueryHandlers = [GetNotificationsHandler];
// export const CommandHandlers = [SendNotificationHandler];
// export const EventHandlers = [Get];
// Could you share a live terminal with me pleasse?

// <uwu> turned read write </uwu>

// thanks :);)

// @Module({
//     imports: [NotificationDataAccessModule],
//     provider