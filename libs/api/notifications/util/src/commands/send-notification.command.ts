import { SendNotificationRequest } from "../requests";

export class SendNotificationCommand {
    constructor(public readonly sendNotification: SendNotificationRequest) {}
}