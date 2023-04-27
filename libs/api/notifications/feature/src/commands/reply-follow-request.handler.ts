import { NotificationRepository } from "@mp/api/notifications/data-access";
import { RelpyFollowRequestCommand, FollowRequestReponse } from "@mp/api/notifications/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(RelpyFollowRequestCommand)
export class ReplyFollowRequestHandler implements ICommandHandler<RelpyFollowRequestCommand, FollowRequestReponse> {
    constructor(private readonly publisher : EventPublisher ,private readonly notificationRepository: NotificationRepository) {}

    async execute(command: RelpyFollowRequestCommand): Promise<FollowRequestReponse> {
        console.log(`Async ${command.constructor.name}...`);
        return await this.notificationRepository.replyFollowRequest(command.request);
    }
}

