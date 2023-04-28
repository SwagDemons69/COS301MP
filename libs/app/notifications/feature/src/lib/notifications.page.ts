import { Component, OnInit } from '@angular/core';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import { notification } from '@mp/api/notifications/util';
import {NotificationsApi} from '@mp/app/notifications/data-access'// i don't remember NotificationApi being made, did you mean to say ../app/.. I did!!!! Thanks Mito! You even told me. I'm dumb lol. THanks
//lol we make stupid mistakes. Haha, it was supposed to app, and not api
// I think it just needs some time to refresh. I don't see anything wrong.
// import {NotificationsApi} from '../../../data-access/src/notifications.api'
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import {user_profile } from '@mp/api/profiles/util';
// import { user } from 'firebase-functions/v1/auth';
import {GetNotificationsRequest, GetNotificationsResponse } from '@mp/api/notifications/util';
import {ProfileState } from '@mp/app/profile/data-access';
import {NotificationType} from "@mp/api/notifications/util"
import {Timestamp } from '@google-cloud/firestore'
import {  formatDistance } from 'date-fns';
// import {Dayjs} from 'dayjs';
// import {RelativeTime}



@Component({
  selector: 'notifications-page',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})

// export class NotificationsPage {
//   notifications = [
//     { icon: 'notifications-outline', time: "18:30", message: 'Prof G has disliked your post.' },
//     { icon: 'notifications-outline', time: "18:00", message: 'Dr Marshal has liked your post.' },
//     { icon: 'notifications-outline', time: "17:00", message: 'Dr Anna has donated 1hr to you.' },
//     { icon: 'notifications-outline', time: "16:00", message: 'You have 0.5hrs left.' },
//     { icon: 'notifications-outline', time: "14:00", message: 'Dr Nills has liked your post.' },
//     { icon: 'notifications-outline', time: "12:00", message: 'Dr A has liked your post.' },
//     { icon: 'notifications-outline', time: "10:00", message: 'Welcome to Twenty4.' }
//   ];
// }

export class NotificationsPage implements OnInit {
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  notifications : notification[] = [];
  notificationType = NotificationType;
  getTime(timestamp : any){
    const total_milliseconds = timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000;
    const date = new Date(total_milliseconds );
    console.log(total_milliseconds);
    console.log(date);

    return formatDistance(date, new Date(), { addSuffix: true });;
  }
  constructor(private readonly api : NotificationsApi) {}

  ngOnInit(): void {
    // console.log("ngOnInit!");
    this.getNotifications();
  }

  getUserID() : string {
    let myUserID = ""
    this.profile$.subscribe(profileData => {
      if (profileData) {
        console.log("there is some data!")
        console.log(profileData);
        console.log("User Id is:" + profileData.user_id);
        myUserID = profileData.user_id;
      } else {
        // handle the case where no profile data is available
        console.log("No profile data available");

      }
    });
    return myUserID;
  }

  // Accept the follow request
  acceptFollowRequest(notif : notification) {
    // Call the necessary service methods to accept the follow request
    // Update the necessary properties or data structures to reflect the change
  }

  // Decline the follow request
  declineFollowRequest(notif : notification) {
    // Call the necessary service methods to decline the follow request
    // Update the necessary properties or data structures to reflect the change
  }

  async getNotifications() {
    // this.notifications = [];
    const myUserID = this.getUserID();
    if(myUserID != "") {
      const request : GetNotificationsRequest = {userId : myUserID};
      this.api.getNotification(request);
      const response : GetNotificationsResponse = await this.api.getNotification(request);
      // const response = await this.notificationRepository.getNotifications(userId);
      // this.notifications = response.notifications;

      // console.log('printing');
      // response.notifications.forEach((notif) => {
      //   console.log(JSON.stringify(notif));
      // });

      this.notifications = response.notifications;
    }
    else{
      console.log("No user ID found");
    }
  }


  refreshPage() {
    window.location.reload();
  }

}

// {
//     user_id: '1234',
//     type: NotificationType.FollowNotification,
//     seen: false,
//     timestamp: Timestamp,
//     notification_id: '1234',
//     follower_id: '1234',
// }

