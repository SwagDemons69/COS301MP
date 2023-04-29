import { ITimeReceivedDetails } from "../interfaces";

export class TimeReceivedNotificationEvent {
    constructor(public readonly notification : ITimeReceivedDetails) {}
}
