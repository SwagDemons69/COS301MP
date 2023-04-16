import { IIndividualChatHistory, IMessage } from "../interfaces";

export class SendMessageEvent{
	constructor(public readonly message: IMessage, public  chat: IIndividualChatHistory){}
}