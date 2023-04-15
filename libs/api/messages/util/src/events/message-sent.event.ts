import { IMessages } from "../interfaces";

export class MessageSentEvent {
    constructor(public readonly messages: IMessages) {}
}