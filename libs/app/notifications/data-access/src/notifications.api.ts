import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Functions, HttpsCallable, httpsCallable } from '@angular/fire/functions';
import { DeleteNotificationRequest, DeleteNotificationResponse, HandleFollowRequest, HandlerFollowResponse, notification } from '@mp/api/notifications/util';
import { map, Observable } from 'rxjs';

@Injectable()
export class NotificationsApi {
    constructor(private readonly functions: Functions,
                private readonly firestore: Firestore) {}


    notifications$(userId: string): Observable<notification[]>{ 
        console.log(userId)
        const notificationsRef = collection(this.firestore, `profiles/${userId}/notifications`);
        return collectionData(notificationsRef).pipe(map((data) => data as notification[]));
    }

    async deleteNotification(user_id: string, notification_id: string){
        const request: DeleteNotificationRequest = { user_id: user_id, notification_id: notification_id };
        return await httpsCallable<DeleteNotificationRequest, DeleteNotificationResponse>(this.functions, 'DeleteNotification')(request);
    }

    async handleFollowRequest(flag: boolean, requester: string, requestee: string){
        const request: HandleFollowRequest = { flag: flag, requester: requester, requestee: requestee};
        return await httpsCallable<HandleFollowRequest, HandlerFollowResponse>(this.functions, 'HandleFollow')(request);
    }
}