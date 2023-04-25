/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
// import { NavController } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'notifications-page',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationsPage {
  notifications = [
    { icon: 'notifications-outline', time: "18:30", message: 'Prof G has disliked your post.' },
    { icon: 'notifications-outline', time: "18:00", message: 'Dr Marshal has liked your post.' },
    { icon: 'notifications-outline', time: "17:00", message: 'Dr Anna has donated 1hr to you.' },
    { icon: 'notifications-outline', time: "16:00", message: 'You have 0.5hrs left.' },
    { icon: 'notifications-outline', time: "14:00", message: 'Dr Nills has liked your post.' },
    { icon: 'notifications-outline', time: "12:00", message: 'Dr A has liked your post.' },
    { icon: 'notifications-outline', time: "10:00", message: 'Welcome to Twenty4.' }
  ];
}