import { message } from "./message.interface";

export interface chat {
    chat_id: string;
    chatName: string;
    receiver: string;
    messages: message[];
}