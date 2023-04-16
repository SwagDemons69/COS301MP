import { IMessage } from "../interfaces";

export class MessageReceivedEvent {
    constructor(public readonly messages: IMessage) {}
}