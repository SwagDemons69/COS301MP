import { chat } from "../interfaces";
export class CreateChatEvent{
    constructor(public readonly chat:chat){}
}