import { IMessages } from "../interfaces";

export class GotChatHistoryEvent {
    constructor(public readonly messages: IMessages) {}
}