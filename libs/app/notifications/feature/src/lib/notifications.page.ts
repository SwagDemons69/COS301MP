/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
// import { NavController } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'notifications-page',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.css']
})
export class NotificationsPage implements OnInit {
  ngOnInit(): void {
    this.getNotifcations();
  }
  
  notifications = [
    {text : 'test1'},
    {text : 'test2'},
    {text : 'test3'},
    {text : 'test4'},
  ];


  async getNotifcations(){
    //send request to get notifications

    //populate notifcations array
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
