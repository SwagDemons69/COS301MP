import { userDetails } from "../interfaces";

export class SystemWelcomeNotificationEvent {
    constructor(public readonly notification : userDetails) {}
}
