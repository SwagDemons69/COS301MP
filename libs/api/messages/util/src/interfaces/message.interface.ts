import { Timestamp } from "firebase-admin/firestore";

export interface IMessage{
    message_id : number | null | undefined;
    from : number | null | undefined; 
    timeStamp: Timestamp | null | undefined;
    caption: string | null | undefined;
}