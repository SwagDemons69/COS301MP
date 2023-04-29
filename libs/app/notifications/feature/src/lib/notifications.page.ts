/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { notification } from '@mp/api/notifications/util';
import { NotificationsState } from '@mp/app/notifications/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
// import { NavController } from '@ionic/angular/providers/nav-controller';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'notifications-page',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationsPage {
  @Select(NotificationsState.notifications) notifications$!: Observable<notification[] | []>
  notifications: notification[] | []
  displayNotifications: any[] = []
  constructor(private readonly toast: ToastController){
    this.notifications = []
    this.displayNotifications = []
    this.notifications$.forEach((array) => {
      this.notifications = array;
      // const toast = await this.toast.create({
      //   message: "HOLY FUCK",
      //   color: 'green',
      //   duration: 1500,
      //   position: 'bottom',
      // });
      this.displayNotifications = []
      this.setNotifications()
      //console.log(this.notifications)
      //await toast.present();
    })
  }

//   export interface notification {
//     notification_id : string; // the id of the notification on firebase
//     image : string; // the user that the notification is for
//     type : string; // the type of notification 
//     payload: string;
//     timestamp : Timestamp; // the time the notification was created
// }
  setNotifications(){
      const copy  = [...this.notifications];
      console.log(copy)
      copy.sort((a, b) => Math.sign(parseInt(a.timeStampOrder) - parseInt(b.timeStampOrder)));
      this.notifications = copy;
      console.log(copy)
      
      for(let i = 0; i < this.notifications.length; i++){
        let type = "";
        switch(this.notifications[i].type){
          //Each type has a case
          case "New Follow Request":{
            type = "person-outline"
            break;
          }
          case "New Follower":{
            type = "person-add-outline"
            break;
          }
          case "New Message":{
            type = "chatbox-ellipses-outline"
            break;
          }
          case "New Like":{
            type = "thumbs-up-outline"
            break;
          }
          case "New Dislike":{
            type ="thumbs-down-outline"
            break;
          }
          case "New Comment":{
            type ="chatbubble-outline"
            break;
          }
          case "New Reply":{
            type ="chatbubbles-outline"
            break;
          }
          default:{
            type = "notifications-outline";
            break;
          }

        }

        //const unixTimestamp = 1620123456; // Replace with your Unix timestamp
        const date = new Date(this.notifications[i].timestamp.seconds * 1000); // Convert Unix timestamp to milliseconds
        const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Convert date to formatted time string
        //console.log(timeString); // Output: "10:50 AM" (or the equivalent for the specified timestamp)

        const noti = {
          icon: type,
          time: timeString,
          message: this.notifications[i].payload
        }
        this.displayNotifications.push(noti)
        //console.log(this.notifications[i].timestamp.toDate())
      }
  }


  notifications2 = [
    { icon: 'notifications-outline', time: "18:30", message: 'Prof G has disliked your post.' },
    { icon: 'notifications-outline', time: "18:00", message: 'Dr Marshal has liked your post.' },
    { icon: 'notifications-outline', time: "17:00", message: 'Dr Anna has donated 1hr to you.' },
    { icon: 'notifications-outline', time: "16:00", message: 'You have 0.5hrs left.' },
    { icon: 'notifications-outline', time: "14:00", message: 'Dr Nills has liked your post.' },
    { icon: 'notifications-outline', time: "12:00", message: 'Dr A has liked your post.' },
    { icon: 'notifications-outline', time: "10:00", message: 'Welcome to Twenty4.' }
  ];

  dismissNotif(notif: any) {
    this.displayNotifications = this.displayNotifications.filter(n => n !== notif);
  }
}