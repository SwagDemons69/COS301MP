import { IGetNewFollowerNotificationRequest } from "../requests/new-follower-notification.request";

export class NewFollowerNotificationCommand {
    constructor(public readonly request: IGetNewFollowerNotificationRequest) {}
}
