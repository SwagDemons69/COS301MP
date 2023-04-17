import { chat, message } from "../interfaces";

export class SendMessageEvent{
	constructor(public readonly message: message, public  chat: chat){}
}