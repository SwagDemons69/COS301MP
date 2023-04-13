import { Timestamp } from "firebase-admin/firestore";

export interface IMessage{
    messageID : number | null | undefined;
    senderId : number | null | undefined;
    receiverId : number | null | undefined; 
    message_type : string | null | undefined;
    message_timestamp: Timestamp | null | undefined;
    message_content: string | null | undefined;
}