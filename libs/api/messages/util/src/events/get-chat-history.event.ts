import { chat } from "../interfaces";

export class GetChatHistoryEvent{
	constructor(public readonly chatHistory : chat ){}
}