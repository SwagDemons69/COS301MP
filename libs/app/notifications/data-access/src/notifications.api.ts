import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { SendNotificationRequest, SendNotificationReponse, GetNotificationsRequest, GetNotificationsResponse } from '@mp/api/notifications/util';
@Injectable()
export class NotificationsApi {
    constructor(private readonly functions: Functions) {}

    async sendNotification(request: SendNotificationRequest) : Promise<SendNotificationReponse> {
        const ret =  await httpsCallable<SendNotificationRequest, SendNotificationReponse>(this.functions, 'sendNotification')(request);
        if(ret && typeof ret.data !== 'undefined'){
            const test = ret.data as SendNotificationReponse
            console.log(test);
            return ret.data as SendNotificationReponse
          }
          else{
            throw new Error('Send notificaiton function returned an invalid response');
          }
    }

    async getNotification(request: GetNotificationsRequest) : Promise<GetNotificationsResponse>{
        const ret  = await httpsCallable<GetNotificationsRequest, GetNotificationsResponse>(this.functions, 'getNotifications')(request);
        if(ret && typeof ret.data !== 'undefined'){
            const test = ret.data as GetNotificationsResponse
            console.log(test);
            return ret.data as GetNotificationsResponse
          }
          else{
            throw new Error('Get notification function returned an invalid response');
          }
    }

}