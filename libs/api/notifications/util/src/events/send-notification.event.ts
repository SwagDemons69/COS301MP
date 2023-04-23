import { SendNotificationRequest } from '../requests';

export class SendNotificationEvent {
    constructor(public readonly sendNotification: SendNotificationRequest) {}
}
