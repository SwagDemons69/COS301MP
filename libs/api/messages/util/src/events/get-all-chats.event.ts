import { IChats  } from "../interfaces";

export class GetAllChatsEvent{
	constructor(public readonly chats: IChats){}
}