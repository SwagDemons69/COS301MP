import { GetNotificationsRequest } from "../requests";

export class GetNotificationsQuery {
    constructor(public readonly getNotifications: GetNotificationsRequest) {}
}