import { IIndividualChatHistory } from "./individual-chat-history.interface";

export interface IChats {
    chatIDs: string [];
    chats: IIndividualChatHistory[];
}
