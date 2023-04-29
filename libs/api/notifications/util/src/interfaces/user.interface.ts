import { Timestamp } from 'firebase-admin/firestore';

export interface userDetails {
    userId : string;
    displayName?: string | null | undefined;
    timeStamp: Timestamp | null | undefined;
}
