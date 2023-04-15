import { IMessage } from "../interfaces";

export class SendMessageEvent{
	constructor(public readonly message: IMessage){}
}