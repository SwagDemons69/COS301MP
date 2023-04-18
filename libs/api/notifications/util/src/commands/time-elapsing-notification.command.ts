import { notificationInterface } from "../interfaces/notification";

export class TimeElapsingNotificationCommand {
    constructor(public readonly request: notificationInterface) {}
}
