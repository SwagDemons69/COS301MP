import { IChats  } from "../interfaces";

export class GetChatsEvent{
	constructor(public readonly chats: IChats){}
}