import { INewFollowerDetails } from "../interfaces";

export class NewFollowerNotificationEvent {
    constructor(public readonly notification : INewFollowerDetails) {} 
}