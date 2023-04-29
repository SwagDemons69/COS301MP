import { IGetSystemWelcomeNotificationRequest } from "../requests/time-received-notification.request";

export class SystemWelcomeNotificationCommand {
    constructor(public readonly request: IGetSystemWelcomeNotificationRequest) {}
}
