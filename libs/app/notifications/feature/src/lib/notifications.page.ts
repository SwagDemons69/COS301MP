import { Component, OnInit } from '@angular/core';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import { notification } from '@mp/api/notifications/util';

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

// export class NotificationsPage implements OnInit {
//   notifications : notification[] = [];

//   constructor(private notificationRepository: NotificationRepository) {}

//   ngOnInit(): void {
//     this.getNotifications('user_id_here');
//   }

//   async getNotifications(userId : string) {
//     const response = await this.notificationRepository.getNotifications(userId);
//     this.notifications = response.notifications;
//   }


//   refreshPage() {
//     window.location.reload();
//   }
  
// }

// {
//     user_id: '1234',
//     type: NotificationType.FollowNotification,
//     seen: false,
//     timestamp: Timestamp,
//     notification_id: '1234',
//     follower_id: '1234',
// }

