import { NotificationRepository } from "@mp/api/notifications/data-access";
import { SendNotificationCommand, SendNotificationReponse } from "@mp/api/notifications/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler implements ICommandHandler<SendNotificationCommand, SendNotificationReponse> {
    constructor(private readonly publisher : EventPublisher ,private readonly notificationRepository: NotificationRepository) {}

    async execute(command: SendNotificationCommand): Promise<SendNotificationReponse> {
        console.log(`Async ${command.constructor.name}...`);
        return await this.notificationRepository.sendNotification(command.sendNotification);
    }
}

