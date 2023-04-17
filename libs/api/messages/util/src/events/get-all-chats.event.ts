import { chats  } from "../interfaces";

export class GetAllChatsEvent{
	constructor(public readonly chats: chats){}
}