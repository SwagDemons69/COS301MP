import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { notification } from '@mp/api/notifications/util';
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
}