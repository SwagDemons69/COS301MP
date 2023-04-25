import { followerDetails } from "../interfaces";

export class TimeElapsingNotificationEvent {
    constructor(public readonly notification : followerDetails) {}
}
