import { message } from "../interfaces";

export class MessageReceivedEvent {
    constructor(public readonly messages: message) {}
}