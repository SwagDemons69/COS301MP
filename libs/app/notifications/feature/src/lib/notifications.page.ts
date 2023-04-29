/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { notification } from '@mp/api/notifications/util';
import { NotificationsState } from '@mp/app/notifications/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
// import { NavController } from '@ionic/angular/providers/nav-controller';
import { ToastController } from '@ionic/angular';
import { NotificationsApi} from '@mp/app/notifications/data-access'
import { ProfileState } from '@mp/app/profile/data-access';
import { user_profile } from '@mp/api/profiles/util';
@Component({
  selector: 'notifications-page',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationsPage {
  @Select(ProfileState.profile) profile$!: Observable< user_profile| null > 
  @Select(NotificationsState.notifications) notifications$!: Observable<notification[] | []>

  notifications: notification[] | []
  displayNotifications: any[] = []
  profile: user_profile | undefined

  constructor(private readonly toast: ToastController,
              private readonly api: NotificationsApi){
    this.notifications = []
    this.displayNotifications = []
    this.notifications$.forEach((array) => {
      this.notifications = array;
      
      this.displayNotifications = []
      this.setNotifications();



      this.profile$.forEach((profile) => {
        if (profile) {
          //Default Profile Image
          this.profile = profile;
          //console.log(this.profile.user_id)
        }
      })
      
    })
  }

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
          id: this.notifications[i].notification_id,
          icon: type,
          time: timeString,
          username: this.notifications[i].username,
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

  async dismissNotif(notif: any) {
    const notfiToDel  = notif
    this.displayNotifications = this.displayNotifications.filter(n => n !== notif);
    if(this.profile){
        console.log(notfiToDel)
        const response = await this.api.deleteNotification(this.profile?.user_id, notfiToDel.id);
        console.log(response.data.msg)
    }
  }
}