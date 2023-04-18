import { notificationInterface } from "../interfaces/notification";

export class SystemWelcomeNotificationCommand {
    constructor(public readonly request: notificationInterface) {}
}
