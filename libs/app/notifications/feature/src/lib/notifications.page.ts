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
    { icon: 'fa-info-circle', message: 'Prof G has disliked your post.' },
    { icon: 'fa-info-circle', message: 'Dr Marshal has liked your post.' },
    { icon: 'fa-info-circle', message: 'Dr Anna has donated 1hr to you.' },
    { icon: 'fa-info-circle', message: 'You have 0.5hrs left.' },
    { icon: 'fa-info-circle', message: 'Dr Nills has liked your post.' },
    { icon: 'fa-info-circle', message: 'Dr A has liked your post.' },
    { icon: 'fa-info-circle', message: 'Welcome to Twenty4.' }
  ];
}