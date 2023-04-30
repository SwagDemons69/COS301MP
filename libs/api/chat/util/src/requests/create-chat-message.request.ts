import { ChatMessage } from "../interfaces";

export interface CreateChatMessageRequest{
    sender: string;
    receiver:string;
    chat: ChatMessage;
}