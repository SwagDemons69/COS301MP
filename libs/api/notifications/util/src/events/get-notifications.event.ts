import { GetNotificationsRequest } from '../requests';

export class GetNotificationsEvent {
    constructor(public readonly getNotifications: GetNotificationsRequest) {}
}