import { notificationInterface } from "../interfaces/notification";

export class TimeReceivedNotificationCommand {
    constructor(public readonly request: notificationInterface) {}
}
