import { IMessage } from "./message.interface";

export interface IIndividualChatHistory {
    chat_id: string;
    chatName: string;
    users: string[];
    messages: IMessage [];
}