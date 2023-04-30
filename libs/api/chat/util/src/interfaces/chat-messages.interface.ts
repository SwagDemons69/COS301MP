import { ChatMessage } from "./chat-message.interface";

export interface ChatMessages{
    recipient: string;
    messages: ChatMessage[];
}