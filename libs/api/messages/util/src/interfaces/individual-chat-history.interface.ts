import { IMessage } from "./message.interface";

export interface IIndividualChatHistory {
    flag: string;
    messages: IMessage [];
}