import { IGetTimeElapsingNotificationRequest } from "../requests/time-received-notification.request";

export class NewFollowerNotificationCommand {
    constructor(public readonly request: IGetTimeElapsingNotificationRequest) {}
}
