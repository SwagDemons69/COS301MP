import { IMessage } from "./message.interface";

export interface IIndividualChatHistory {
    flag: string | null | undefined;
    messages: IMessage [];
    chatID: number | null | undefined;
    chatName: string | null | undefined;
}