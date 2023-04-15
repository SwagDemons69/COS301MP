/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
// import { NavController } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'notifications-page',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.css']
})
export class NotificationsPage {
  notifications = [
    { icon: 'notifications-outline', message: 'Prof G has disliked your post.' },
    { icon: 'notifications-outline', message: 'Dr Marshal has liked your post.' },
    { icon: 'notifications-outline', message: 'Dr Anna has donated 1hr to you.' },
    { icon: 'notifications-outline', message: 'You have 0.5hrs left.' },
    { icon: 'notifications-outline', message: 'Dr Nills has liked your post.' },
    { icon: 'notifications-outline', message: 'Dr A has liked your post.' },
    { icon: 'notifications-outline', message: 'Welcome to Twenty4.' }
  ];
}