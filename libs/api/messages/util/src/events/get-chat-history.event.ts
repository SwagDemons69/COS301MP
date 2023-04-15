import { IIndividualChatHistory } from "../interfaces";

export class GetChatHistoryEvent{
	constructor(public readonly chatHistory : IIndividualChatHistory ){}
}